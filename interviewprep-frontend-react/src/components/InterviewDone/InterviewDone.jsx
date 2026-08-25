import React, {useEffect, useState, useRef} from "react";
import "./InterviewDone.css";
import { AppContext } from "../App";
import { useContext } from "react";
import HemiSphere from "../HemiSphere/HemiSphere";
import Button from "../Button/Button";
import html2pdf from 'html2pdf.js';
import ReactMarkdown from 'react-markdown';
import Footer from "../Footer/Footer";

const InterviewDonePage = () => {


    const {ws, recordedChunks, feedbackReport} = useContext(AppContext)
    const reportRef = useRef(null)
    const [capturing, setCapturing] = useState(false);


    // useEffect(() => {
    //     ws.current.onmessage = (event) => {
    //         setFeedbackReport(event.data)
    //     }
    // },[])


    const downloadRecording = () => {
        const blob = new Blob(recordedChunks.current)
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'recording.webm';
        a.click();
        URL.revokeObjectURL(url);


    }

   const downloadReport = () => {
    setCapturing(true)
    html2pdf().from(reportRef.current).save('interview_report.pdf').then(() => {
    setCapturing(false)});

  }


    return (
    <>

    <HemiSphere/>
    
    <div id="done-page-wrapper">

        <h2>Thank you for interviewing with us. Your session artifacts are below.</h2>
        
        <div ref={reportRef} id={capturing ? "capture-mode": "feedback-wrapper"}>
            <label> <h3>Feedback Report:</h3> </label>
            <ReactMarkdown>{feedbackReport.current}</ReactMarkdown>
        </div>

        <Button label={"Download Report"} onClick={downloadReport}/>
       
       <div id="recording-wrapper">
            <label> <h2>Recording:</h2> </label>
            {console.log(recordedChunks.current.length)}
            {recordedChunks.current.length > 0 ? <Button label={"Download Recording"} onClick={downloadRecording}/>
            : "Your recording should be saved to your device if you chose to record."}
        </div>

    </div>

        <Footer/>
    </>
    )
}


export default InterviewDonePage