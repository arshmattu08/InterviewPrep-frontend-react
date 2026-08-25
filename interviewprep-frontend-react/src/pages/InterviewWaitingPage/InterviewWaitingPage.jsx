import React, {useEffect, useRef, useState} from "react";
import "./InterviewWaitingPage.css";
import WaitingDialogBox  from "../../components/WaitingDialogBox/WaitingDialogBox";
import { AppContext } from "../../components/App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const InterviewWaitingPage = () => {

    const wsUrl = import.meta.env.VITE_BE_URL.replace(/^http/, 'ws');

    const {stream, ws, recordingData, videoTrack,fileWriter, greetingBuffer, accessToken} = useContext(AppContext)
    const navigate = useNavigate()

    const [isUserReady, setUserReady] = useState(false)
    const interviewData = JSON.parse(localStorage.getItem("interviewData"))
    recordingData.current = interviewData
    console.log(interviewData)

    const getPermissions = async (data) => {

        console.log("permissions are hit!")
        stream.current = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation: true, echoCancellationType:'system', noiseSuppression: true}}) // interview mic permission

        if (data.recordingOption == "No Recording"){return}

        if (data.recordingOption == "Audio and Video") {
           const videoStream = await navigator.mediaDevices.getUserMedia({video: true});
           videoTrack.current = videoStream.getVideoTracks()[0];

        }

        //chrome
        if (window.showSaveFilePicker) {
            const fileHandle = await window.showSaveFilePicker({suggestedName: "recording.webm"})
            fileWriter.current = await fileHandle.createWritable() }
        } 


    const joinInterview = async () => {
       setUserReady(true)

       const delays = [2000, 3000, 4000, 5000];
       const randomDelay = delays[Math.floor(Math.random() * delays.length)];
       ws.current = new WebSocket(`${wsUrl}/interview?token=${accessToken}`)
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
                    greetingBuffer.current = await greetingBuffer.current.arrayBuffer()
                    console.log("greeting converted to arrayBuffer and now moving to interview page")
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
        <div id="waiting-wrapper">
            <WaitingDialogBox 
            joinInterview={joinInterview}
            interviewData={interviewData}
            isUserReady={isUserReady}/>
        </div>
    )       

}

export default InterviewWaitingPage