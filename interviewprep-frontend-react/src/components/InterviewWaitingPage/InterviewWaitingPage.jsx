import React, {useEffect, useState} from "react";
import "./InterviewWaitingPage.css"
import WaitingDialogBox  from "../WaitingDialogBox/WaitingDialogBox";

const InterviewWaitingPage = (props) => {

    const [isUserReady, setUserReady] = useState(false)
    const interviewData = JSON.parse(localStorage.getItem("interviewData"))
    console.log(interviewData)

    const getPermissions = async (data) => {
        if (data.recordingOption == "No Recording"){return}

        console.log("permissions are hit!")
        const fileHandle = await window.showSaveFilePicker({suggestedName: "recording.webm"})
        props.fileW.current = await fileHandle.createWritable()

        console.log(data.jobDescription)
        console.log(data.additionalContext)
        console.log(data.recordingOption)

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
       props.wsConn.current = new WebSocket("ws://localhost:8000/interview")
       await getPermissions(interviewData)
       props.wsConn.current.onopen = () => {
                props.wsConn.current.send(JSON.stringify(interviewData)) // gonna trigger greeting 
                }
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