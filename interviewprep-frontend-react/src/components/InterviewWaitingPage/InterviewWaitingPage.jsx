import React, {useEffect, useState} from "react";
import "./InterviewWaitingPage.css"
import WaitingDialogBox  from "../WaitingDialogBox/WaitingDialogBox";

const InterviewWaitingPage = (props) => {

    const [isUserReady, setUserReady] = useState(false)
    const interviewData = JSON.parse(localStorage.getItem("interviewData"))
    console.log(interviewData)

    const getPermissions = async (data) => {

        console.log("permissions are hit!")
        props.stream.current = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation: true}}) // interview mic permission

        if (data.recordingOption == "No Recording"){return}

        const fileHandle = await window.showSaveFilePicker({suggestedName: "recording.webm"})
        props.fileW.current = await fileHandle.createWritable()


        if (data.recordingOption == "Audio and Video") {
            props.sessionStr.current = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false},video:true})
            props.sessionRec.current = new MediaRecorder(props.sessionStr.current);
            props.sessionRec.current.ondataavailable = async (event) => {props.fileW.current.write(event.data);}
            props.sessionRec.current.start()}

        else if (data.recordingOption == "Audio Only") {
            props.sessionStr.current = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false}})
            props.sessionRec.current = new MediaRecorder(props.sessionStr.current);
            props.sessionRec.current.ondataavailable = async (event) => {props.fileW.current.write(event.data);}
            props.sessionRec.current.start()}
            
        } 


    const joinInterview = async () => {
       setUserReady(true)

       const delays = [2000, 3000, 4000, 5000];
       const randomDelay = delays[Math.floor(Math.random() * delays.length)];
       props.wsConn.current = new WebSocket("ws://192.168.1.68:8000/interview")
       props.wsConn.current.onopen = () => {
                console.log("data SENT")
                props.wsConn.current.send(JSON.stringify(interviewData)) // gonna trigger greeting 
                props.wsConn.current.onmessage = (event) => {
                    props.greetingBuffer.current= event.data }

                }
       await getPermissions(interviewData)
       setTimeout(() => props.joiningInterview(true), randomDelay);
       
    }
    

    return  (

            <WaitingDialogBox 
            joinInterview={joinInterview}
            getPermissions={getPermissions}
            interviewData={interviewData}
            isUserReady={isUserReady}/>

    )       

}

export default InterviewWaitingPage