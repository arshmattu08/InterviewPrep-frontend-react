import React, {useEffect, useRef, useState} from "react";
import "./InterviewWaitingPage.css";
import WaitingDialogBox  from "../../components/WaitingDialogBox/WaitingDialogBox";
import { AppContext } from "../../components/App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const InterviewWaitingPage = () => {

    const {stream, ws, sessionStream, sessionRecorder,fileWriter, recordedChunks, greetingBuffer} = useContext(AppContext)
    const navigate = useNavigate()

    const [isUserReady, setUserReady] = useState(false)
    const interviewData = JSON.parse(localStorage.getItem("interviewData"))
    console.log(interviewData)

    const getPermissions = async (data) => {

        console.log("permissions are hit!")
        stream.current = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation: true, echoCancellationType:'system'}}) // interview mic permission

        if (data.recordingOption == "No Recording"){return}

        //chrome
        if (window.showSaveFilePicker) {

            const fileHandle = await window.showSaveFilePicker({suggestedName: "recording.webm"})
            fileWriter.current = await fileHandle.createWritable()


            if (data.recordingOption == "Audio and Video") {
                sessionStream.current = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false},video:true})
                sessionRecorder.current = new MediaRecorder(sessionStream.current);
                sessionRecorder.current.ondataavailable = async (event) => {fileWriter.current.write(event.data);}
                sessionRecorder.current.start()}

            else if (data.recordingOption == "Audio Only") {
                sessionStream.current = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false}})
                sessionRecorder.current = new MediaRecorder(sessionStream.current);
                sessionRecorder.current.ondataavailable = async (event) => {fileWriter.current.write(event.data);}
                sessionRecorder.current.start()}
           
        }
        //safari
        else {

            if (data.recordingOption == "Audio and Video") {
                sessionStream.current = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false},video:true})
                sessionRecorder.current = new MediaRecorder(sessionStream.current);
                sessionRecorder.current.ondataavailable = async (event) => {recordedChunks.current.push(event.data);}
                sessionRecorder.current.start()}

            else if (data.recordingOption == "Audio Only") {
                sessionStream.current = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false}})
                sessionRecorder.current = new MediaRecorder(sessionStream.current);
                sessionRecorder.current.ondataavailable = async (event) => {recordedChunks.current.push(event.data);}
                sessionRecorder.current.start()}

        }

        } 


    const joinInterview = async () => {
       setUserReady(true)

       const delays = [2000, 3000, 4000, 5000];
       const randomDelay = delays[Math.floor(Math.random() * delays.length)];
       ws.current = new WebSocket("wss://impolite-buckle-harddisk.ngrok-free.dev/interview")
       ws.current.onopen = () => {
                ws.current.send(JSON.stringify(interviewData))
                console.log("interviewData sent to backend.")
                ws.current.onmessage = (event) => {
                    greetingBuffer.current= event.data;
                    console.log("greeting audio on the way to buffer")}

                }
       await getPermissions(interviewData)
       setTimeout( async () => {
                    while(!greetingBuffer.current) {
                        await new Promise(r => setTimeout(r,100))
                    }
                    console.log(greetingBuffer)
                    navigate("/interviewpage")}, 
                    randomDelay);
       
    }

// const waitForGreeting = async () => {
    // while (!greetingBuffer.current) {
    //     await new Promise(r => setTimeout(r, 100))
    // }
    //     playGreeting()
    // }



    

    return  (

            <WaitingDialogBox 
            joinInterview={joinInterview}
            interviewData={interviewData}
            isUserReady={isUserReady}/>

    )       

}

export default InterviewWaitingPage