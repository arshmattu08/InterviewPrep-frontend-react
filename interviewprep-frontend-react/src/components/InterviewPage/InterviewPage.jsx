import React, {useState, useEffect, useRef} from "react";
import "./InterviewPage.css"
import InterviewBar from "../InterviewBar/InterviewBar";
import Grid from "../InterviewGrid/InterviewGrid";
import InterviewWaitingPage from "../InterviewWaitingPage/InterviewWaitingPage";


const InterviewPage = (props) => {

    const [time, setTime] = useState(0);


    const audioContext = useRef(new AudioContext());
    const analyser = useRef(audioContext.current.createAnalyser());
    const dataArray = useRef(new Uint8Array(analyser.current.frequencyBinCount));
    const isRecording = useRef(false)
    const bufferSource = useRef(null);
    const silenceStart = useRef(null)
    const SILENCE_LIMIT = 3000; //millisec
    const silenceFrames = useRef(null);
    const threshold = 20;
    const isWaitingResponse = useRef(false)
    let recorder = useRef(null);
    let stream = useRef(null);
    let audio_chunks = useRef([]);


    const playGreeting = async () => {
        isWaitingResponse.current = true
        const arrayBuffer = await props.greetingBuffer.current.arrayBuffer()
        const decoded = await audioContext.current.decodeAudioData(arrayBuffer)
        bufferSource.current = audioContext.current.createBufferSource()
        bufferSource.current.buffer = decoded
        bufferSource.current.connect(audioContext.current.destination)
        bufferSource.current.start()
         bufferSource.current.onended = () => {
            isWaitingResponse.current = false}
    }


    // const waitForGreeting = async () => {
    // while (!props.greetingBuffer.current) {
    //     await new Promise(r => setTimeout(r, 100))
    // }
    //     playGreeting()
    // }


    const initInterview = async () => {
        stream.current = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation: true}})
        recorder.current = new MediaRecorder(stream.current);
        recorder.current.ondataavailable = (event) => audio_chunks.current.push(event.data)
        recorder.current.onstop = () => {
            const blob = new Blob(audio_chunks.current, {type: "audio/webm"});
            isWaitingResponse.current = true;
            props.wsConn.current.send(blob);
            console.log("User Response ended and sent over!");}
        const mic_source = audioContext.current.createMediaStreamSource(stream.current); 
        mic_source.connect(analyser.current);
        playGreeting();
        detectSpeech();
    }

     const detectSpeech = () => {
        analyser.current.getByteFrequencyData(dataArray.current);
        const avg_volume = dataArray.current.reduce((a,b) => a + b)/ dataArray.current.length;


        if (!isWaitingResponse.current){
          if (avg_volume > threshold){
            silenceStart.current = null;
            if (!isRecording.current) { // for first time, INTERRUPTION LOGIC
                if (bufferSource.current) {bufferSource.current.stop()}
            audio_chunks.current = []
            recorder.current.start()
            isRecording.current = true
            console.log("Recorder started")}  } 

         else if (isRecording.current){ //recorder is on and volume below threshold = silence, CLIENT IS DONE LOGIC
            if (!silenceStart.current) {silenceStart.current = Date.now()}
            if ((Date.now() - silenceStart.current) > SILENCE_LIMIT) {
            recorder.current.stop()
            isRecording.current = false
            }} }
   

        requestAnimationFrame(detectSpeech)
        
    }

    props.wsConn.current.onmessage = async (event) => {
        console.log("AI responding...", event.data)
        isWaitingResponse.current = false
        const arrayBuffer = await event.data.arrayBuffer()
        const decoded = await audioContext.current.decodeAudioData(arrayBuffer)
        bufferSource.current = audioContext.current.createBufferSource()
        bufferSource.current.buffer = decoded
        bufferSource.current.connect(audioContext.current.destination)
        bufferSource.current.start()
    }


    useEffect(() => {
        initInterview()
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
        props.sessionRec.current.onstop = () => {
            props.fileW.current.close()
            props.wsConn.current.send(JSON.stringify({"msg":"end"}))
    }
        props.sessionRec.current.stop()
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