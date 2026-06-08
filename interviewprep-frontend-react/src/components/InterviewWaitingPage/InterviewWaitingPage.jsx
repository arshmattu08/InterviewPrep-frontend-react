import React, {useEffect, useState} from "react";
import "./InterviewWaitingPage.css"

const InterviewWaitingPage = (props) => {
    

    const joinInterview = () => {

        props.joiningInterview(true)
       
    }
    
// !INPORTANT We need to convert this page to BeginInterviewPage and InterviewPage is for main call.

    return  <div>
                <h2>Welcome to your mock interview!</h2>

                

                <button onClick={joinInterview}>Join</button>
            </div>
}

export default InterviewWaitingPage