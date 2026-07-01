import React, {useEffect, useState} from "react";
import "./InterviewDone.css";

const InterviewDonePage = (props) => {


    const [feedbackReport, setFeedbackReport] = useState("")



    useEffect(() => {
        props.wsConn.current.onmessage = (event) => {
            setFeedbackReport(event.data)
        }
    },[])


    return <div>
        
        <label> <h5>Feedback Report:</h5> </label>
        <p>{feedbackReport}</p>

         <label> <h5>Recording:</h5> </label>
        <button>Download Recording</button>



    </div>


}


export default InterviewDonePage