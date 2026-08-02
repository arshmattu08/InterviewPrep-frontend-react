import React, {useState, useEffect, useRef, act} from "react";
import "./InterviewPage.css"
import InterviewBar from "../../components/InterviewBar/InterviewBar";
import Grid from "../../components/InterviewGrid/InterviewGrid"
import InterviewWaitingPage from "../InterviewWaitingPage/InterviewWaitingPage";
import {useMicVAD} from "@ricky0123/vad-react";
import { AppContext } from "../../components/App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "../../components/PopUp/PopUp";


const InterviewPage = () => {


    const {greetingBuffer,stream, ws, sessionRecorder, fileWriter} = useContext(AppContext)
    const navigate = useNavigate()

    const [time, setTime] = useState(0);
    const [showPopUp, setshowPopUp] = useState(false);
    const [whoTalking, setWhoTalking] = useState("")


    const audioContext = useRef(new AudioContext());
    const audioCtx = useRef(new AudioContext({ sampleRate: 24000 })); // for TTS playback
    const analyser = useRef(audioContext.current.createAnalyser());
    const dataArray = useRef(new Uint8Array(analyser.current.frequencyBinCount));
    const isRecording = useRef(false)
    const bufferSource = useRef(null);
    const silenceStart = useRef(null)
    const SILENCE_LIMIT = 3500; //millisec
    const silenceFrames = useRef(null);
    const threshold = 20;
    const isWaitingResponse = useRef(false)
    const isGreetingPlaying = useRef(false)
    const graceTimer = useRef(null);
    let activeSources = useRef([]);
    let leftoverByte = useRef(null);
    let recorder = useRef(null);
    let audio_chunks = useRef([]);
    const ignoreIncomingBytes = useRef(false)
    const hasWarned = useRef(false)


    const playGreeting = async () => {
        const arrayBuffer = await greetingBuffer.current.arrayBuffer()
        const decoded = await audioContext.current.decodeAudioData(arrayBuffer)
        bufferSource.current = audioContext.current.createBufferSource()
        bufferSource.current.buffer = decoded
        bufferSource.current.connect(audioContext.current.destination)
        bufferSource.current.start()
        setWhoTalking("ai")
        console.log("greeting started playing..")
        
        bufferSource.current.onended = () => {
            console.log("greeting ended.")
            setWhoTalking("")
            isWaitingResponse.current = false
            isGreetingPlaying.current = false
    }
        
    }



    const initInterview = async () => {
        recorder.current = new MediaRecorder(stream.current);
        recorder.current.ondataavailable = (event) => {
                 if (event.data.size > 0) {
                         ws.current.send(event.data);
                                            }
                    }

        recorder.current.onstop = () => {
            isWaitingResponse.current = true;
            ws.current.send(JSON.stringify({"msg":"user_done"})); 
            console.log("User response is done")
        }
        const mic_source = audioContext.current.createMediaStreamSource(stream.current); 
        mic_source.connect(analyser.current);
        // detectSpeech();
    }



    const vad = useMicVAD({
        baseAssetPath: "https://cdn.jsdelivr.net/npm/@ricky0123/vad-web@0.0.30/dist/",
        onnxWASMBasePath: "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/",
        getStream: () => Promise.resolve(stream.current), 
        positiveSpeechThreshold: 0.9,
        onSpeechStart: () => {
                console.log("speech started")
                setWhoTalking("user")
                if (isWaitingResponse.current) {return}
                if (graceTimer.current) clearTimeout(graceTimer.current);
                if (!isRecording.current) {
                    stopAIPlayback()
                    console.log("AI cut off")
                    recorder.current.start(250);
                    isRecording.current = true;
            }
        },
        onSpeechEnd: () => {
            console.log("speech ended")
            setWhoTalking("")
            graceTimer.current = setTimeout(() => {
                recorder.current.stop();
                isRecording.current = false;}, 500)

            },
        onVADMisfire: () => {
        if (graceTimer.current) {
        clearTimeout(graceTimer.current)
        graceTimer.current = null
         }
        if (isRecording.current) {
        recorder.current.stop()
        isRecording.current = false
            }
        }
        })
    




let nextStartTime = useRef(0);

 function playPCMChunk(arrayBuffer) {
    let bytes = new Uint8Array(arrayBuffer);

    if (leftoverByte.current !== null) {
    bytes = new Uint8Array([leftoverByte.current, ...bytes]);
    leftoverByte.current = null;
  }

  if (bytes.length % 2 !== 0) {
    leftoverByte.current = bytes[bytes.length - 1];
    bytes = bytes.slice(0, -1);
  }


  const int16 = new Int16Array(bytes.buffer);
  const float32 = new Float32Array(int16.length);
  for (let i = 0; i < int16.length; i++) {
    float32[i] = int16[i] / 32768; // [-1,1) transformation
  }

  const audioBuffer = audioCtx.current.createBuffer(1, float32.length, 24000);
  audioBuffer.copyToChannel(float32, 0);

  const source = audioCtx.current.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioCtx.current.destination);

  activeSources.current.push(source);
  source.onended = () => {
    activeSources.current = activeSources.current.filter(s => s !== source)
    if (activeSources.length === 0) setWhoTalking("")
  }

  const startAt = Math.max(audioCtx.current.currentTime, nextStartTime.current);
  source.start(startAt);
  nextStartTime.current = startAt + audioBuffer.duration;
 }


function stopAIPlayback() {
    if (bufferSource.current) {
    try { bufferSource.current.stop() } catch(e) {}
    }
  activeSources.current.forEach(s => { try { s.stop(); } catch(e) {} });
  activeSources.current = [];
  nextStartTime.current = audioCtx.current.currentTime;
  ignoreIncomingBytes.current = true;
  ws.current.send(JSON.stringify({"msg": "interrupt"}))
}



    ws.current.onmessage = async (event) => {
        console.log("AI responding...")
        

        if (typeof event.data === "string") {
        const msg = JSON.parse(event.data)
        if (msg.msg === "tts_start") {
            setWhoTalking("ai")
            nextStartTime.current = audioCtx.current.currentTime //on tts start, we match nextTime to audioCtx time
            ignoreIncomingBytes.current = false;
        }
                return
    }

    if (ignoreIncomingBytes.current) return;

       //play audio
        isWaitingResponse.current = false
        const arrayBuffer = await event.data.arrayBuffer()
        playPCMChunk(arrayBuffer)
    }


    useEffect(() => {
        initInterview()
        playGreeting()
    },[])

    useEffect(() => {
    const interval = setInterval(() => setTime(t => t + 1), 1000)
    return () => clearInterval(interval)
    }, [])


    // format time
    const minutes = String(Math.floor(time/60)).padStart(2,'0')
    const seconds = String(time % 60).padStart(2,'0')
    const formattedTimer = `${minutes}:${seconds}`



    const handleEnd = () => {
        if (sessionRecorder.current) {
            sessionRecorder.current.onstop = () => fileWriter.current.close()
            sessionRecorder.current.stop()
        }
         ws.current.send(JSON.stringify({"msg":"end"}))
        alert("Thank you for interviewing with us! Review your session in next page")
        navigate("/interviewdonepage")

        }

    // end interview (hit handleEnd) if time exceeds threshold
    useEffect(()=>{

        if (time > 1320) handleEnd()

        else if (time > 1200 && !hasWarned.current) {
            setshowPopUp(true)
             hasWarned.current = true
            }


    },[time])




    return (
        <div id="interview-page-wrapper">

                <InterviewBar handleEnd= {handleEnd}
                            formattedTimer = {formattedTimer}/>

                <Grid whoTalking={whoTalking}/>

                <PopUp showPopUp={showPopUp} setshowPopUp={setshowPopUp} message={"You have about 2 minutes left!"} id={"end-sign"}/>

                

        </div>
    )
}

export default InterviewPage