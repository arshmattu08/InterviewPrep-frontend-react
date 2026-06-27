import React, {useState, useEffect, useRef, act} from "react";
import "./InterviewPage.css"
import InterviewBar from "../InterviewBar/InterviewBar";
import Grid from "../InterviewGrid/InterviewGrid";
import InterviewWaitingPage from "../InterviewWaitingPage/InterviewWaitingPage";
import {useMicVAD} from "@ricky0123/vad-react";


const InterviewPage = (props) => {

    const [time, setTime] = useState(0);


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


    const playGreeting = async () => {
        const arrayBuffer = await props.greetingBuffer.current.arrayBuffer()
        const decoded = await audioContext.current.decodeAudioData(arrayBuffer)
        bufferSource.current = audioContext.current.createBufferSource()
        bufferSource.current.buffer = decoded
        bufferSource.current.connect(audioContext.current.destination)
        bufferSource.current.start()
        bufferSource.current.onended = () => {
        isWaitingResponse.current = false
        isGreetingPlaying.current = false
    }
        
    }


    const waitForGreeting = async () => {
    while (!props.greetingBuffer.current) {
        await new Promise(r => setTimeout(r, 100))
    }
        playGreeting()
    }


    const initInterview = async () => {
        recorder.current = new MediaRecorder(props.stream.current);
        recorder.current.ondataavailable = (event) => {
                 if (event.data.size > 0) {
                         props.wsConn.current.send(event.data);
                                            }
                    }

        recorder.current.onstop = () => {
            isWaitingResponse.current = true;
            props.wsConn.current.send(JSON.stringify({"msg":"user_done"})); 
            console.log("User response is done")
        }
        const mic_source = audioContext.current.createMediaStreamSource(props.stream.current); 
        mic_source.connect(analyser.current);
        // detectSpeech();
    }



    const vad = useMicVAD({
        baseAssetPath: "https://cdn.jsdelivr.net/npm/@ricky0123/vad-web@0.0.30/dist/",
        onnxWASMBasePath: "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/",
        getStream: () => Promise.resolve(props.stream.current), 
        onSpeechStart: () => {
                console.log("speech started")
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
    float32[i] = int16[i] / 32768;
  }

  const audioBuffer = audioCtx.current.createBuffer(1, float32.length, 24000);
  audioBuffer.copyToChannel(float32, 0);

  const source = audioCtx.current.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioCtx.current.destination);

  activeSources.current.push(source);
  source.onended = () => {
    activeSources.current = activeSources.current.filter(s => s !== source)
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
  props.wsConn.current.send(JSON.stringify({"msg": "interrupt"}))
}



    props.wsConn.current.onmessage = async (event) => {
        console.log("AI responding...")
        isWaitingResponse.current = false

        if (typeof event.data === "string") {
        const msg = JSON.parse(event.data)
        if (msg.msg === "tts_start") {
            nextStartTime.current = audioCtx.current.currentTime
        }
                return
    }

       //play audio
        const arrayBuffer = await event.data.arrayBuffer()
        playPCMChunk(arrayBuffer)
    }


    useEffect(() => {
        initInterview()
        waitForGreeting()
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
        if (props.sessionRec.current) {
            props.sessionRec.current.onstop = () => props.fileW.current.close()
            props.sessionRec.current.stop()
        }
         props.wsConn.current.send(JSON.stringify({"msg":"end"}))
        alert("Your interview has been ended successfully.")

        }


    return (
        <div>
                <InterviewBar handleEnd= {handleEnd}
                            formattedTimer = {formattedTimer}/>
                <Grid />

        </div>
    )
}

export default InterviewPage