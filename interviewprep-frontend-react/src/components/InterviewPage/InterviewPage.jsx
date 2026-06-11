import React, {useState, useEffect, useRef} from "react";

const InterviewPage = (props) => {

    const audioContext = useRef(new AudioContext());
    const analyser = useRef(audioContext.current.createAnalyser());
    const dataArray = useRef(new Uint8Array(analyser.current.frequencyBinCount));
    const isRecording = useRef(false)
    const bufferSource = useRef(null);
    const silenceStart = useRef(null)
    const SILENCE_LIMIT = 3000; //millisec
    const silenceFrames = useRef(null);
    const threshold = 20;
    let recorder = useRef(null);
    let stream = useRef(null);
    let audio_chunks = useRef([]);


    const initInterview = async () => {
        stream.current = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation: true}})
        recorder.current = new MediaRecorder(stream.current);
        recorder.current.ondataavailable = (event) => audio_chunks.current.push(event.data)
        recorder.current.onstop = () => {
            const blob = new Blob(audio_chunks.current, {type: "audio/webm"});
            props.wsConn.current.send(blob);
            console.log("User Response ended and sent over!");}
        const mic_source = audioContext.current.createMediaStreamSource(stream.current); 
        mic_source.connect(analyser.current);
        detectSpeech();
    }

     const detectSpeech = () => {
        analyser.current.getByteFrequencyData(dataArray.current);
        const avg_volume = dataArray.current.reduce((a,b) => a + b)/ dataArray.current.length;

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
            }}
   

        requestAnimationFrame(detectSpeech)
        
    }

    props.wsConn.current.onmessage = async (event) => {
        console.log("received greeting", event.data)
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


    return <div>
        <button>Leave</button>
    </div>
}

export default InterviewPage