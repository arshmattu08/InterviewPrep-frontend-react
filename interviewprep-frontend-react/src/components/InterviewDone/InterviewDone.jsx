import React, {useEffect, useState} from "react";
import "./InterviewDone.css";
import { AppContext } from "../App";
import { useContext } from "react";
import ReactMarkdown from 'react-markdown';

const InterviewDonePage = () => {


    const {ws, recordedChunks, feedbackReport} = useContext(AppContext)



    // useEffect(() => {
    //     ws.current.onmessage = (event) => {
    //         setFeedbackReport(event.data)
    //     }
    // },[])


    const handleDownload = () => {
        const blob = new Blob(recordedChunks.current)
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'recording.webm';
        a.click();
        URL.revokeObjectURL(url);


    }




    return <div id="done-page-wrapper">
        
        <label> <h5>Feedback Report:</h5> </label>
        <ReactMarkdown>{feedbackReport.current}</ReactMarkdown>

       
        <label> <h5>Recording:</h5> </label>
        {recordedChunks.current.length > 0 ? <button onClick={handleDownload}>Download Recording</button> 
        : "Your recording should be saved to your device if you chose to record."}


    </div>


}


export default InterviewDonePage