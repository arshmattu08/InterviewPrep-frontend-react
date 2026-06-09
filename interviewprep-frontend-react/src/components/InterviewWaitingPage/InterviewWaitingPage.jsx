import React, {useEffect, useState} from "react";
import "./InterviewWaitingPage.css"

const InterviewWaitingPage = (props) => {


    const interviewData = JSON.parse(localStorage.getItem("interviewData"))
    console.log(interviewData)

    const getPermissions = async (data) => {
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

       props.wsConn.current = new WebSocket("ws://localhost:8000/interview")
       await getPermissions(interviewData)
       props.wsConn.current.onopen = () => {
                props.wsConn.current.send(JSON.stringify(interviewData))
                }
       props.joiningInterview(true)
       
    }
    

    return  <div>
                <h2>Welcome to your mock interview!</h2>

                

                <button onClick={joinInterview}>Join</button>
            </div>
}

export default InterviewWaitingPage