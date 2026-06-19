import React, {useState, useEffect, useRef} from "react";
import "./InterviewPage.css"
import InterviewBar from "../InterviewBar/InterviewBar";
import Grid from "../InterviewGrid/InterviewGrid";
import InterviewWaitingPage from "../InterviewWaitingPage/InterviewWaitingPage";
import {useMicVAD} from "@ricky0123/vad-react";


const InterviewPage = (props) => {

    const [time, setTime] = useState(0);


    const audioContext = useRef(new AudioContext());
    const analyser = useRef(audioContext.current.createAnalyser());
    const dataArray = useRef(new Uint8Array(analyser.current.frequencyBinCount));
    const isRecording = useRef(false)
    const bufferSource = useRef(null);
    const silenceStart = useRef(null)
    const SILENCE_LIMIT = 3500; //millisec
    const silenceFrames = useRef(null);
    const threshold = 20;
    const isWaitingResponse = useRef(false)
    const graceTimer = useRef(null);
    const shouldInterrupt = useRef(true)
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
            isWaitingResponse.current = false}
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
            if (shouldInterrupt.current) {
                console.log("speech started")
                if (graceTimer.current) clearTimeout(graceTimer.current);
                if (!isRecording.current) {
                    if(bufferSource.current) bufferSource.current.stop(), console.log("AI cut off,speech detected")
                    recorder.current.start(250);
                    isRecording.current = true;
            }}
        },
        onSpeechEnd: () => {
            console.log("speech ended")
            graceTimer.current = setTimeout(() => {
                recorder.current.stop();
                isRecording.current = false;
                isWaitingResponse.current = true;}, 1500)

            },
        onVADMisfire: () => {
        if (graceTimer.current) {
        clearTimeout(graceTimer.current)
        graceTimer.current = null
         }
        if (isRecording.current) {
        recorder.current.stop()
        isRecording.current = false
        isWaitingResponse.current = false
            }
        }
        })
    




     const detectSpeech = () => {
        analyser.current.getByteFrequencyData(dataArray.current);
        const avg_volume = dataArray.current.reduce((a,b) => a + b)/ dataArray.current.length;

          if (!isWaitingResponse.current) {
          if (avg_volume > threshold){
            console.log("interrupted! and", avg_volume)
            silenceStart.current = null;
            if (!isRecording.current) { // for first time, INTERRUPTION LOGIC
                if (bufferSource.current) {bufferSource.current.stop()}
            recorder.current.start(250)
            isRecording.current = true
            console.log("Recorder started")}  } 
        

         else if (isRecording.current){ //recorder is on and volume below threshold = silence, CLIENT IS DONE LOGIC
            if (!silenceStart.current) {silenceStart.current = Date.now()}
            if ((Date.now() - silenceStart.current) > SILENCE_LIMIT) {
            console.log("Silence limit exceeded, stopping recorder...")
            recorder.current.stop()
            isRecording.current = false
            }} 
   
        }
        requestAnimationFrame(detectSpeech)
        
    }

    props.wsConn.current.onmessage = async (event) => {
        shouldInterrupt.current = false
        console.log("AI responding...", event.data)
        isWaitingResponse.current = false
        const arrayBuffer = await event.data.arrayBuffer()
        const decoded = await audioContext.current.decodeAudioData(arrayBuffer)
        bufferSource.current = audioContext.current.createBufferSource()
        bufferSource.current.buffer = decoded
        bufferSource.current.connect(audioContext.current.destination)
        bufferSource.current.start()
        setTimeout(() => { shouldInterrupt.current = true }, 4000)
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