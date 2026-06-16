import React from "react";
import "./InterviewBar.css"

const InterviewBar = ({handleEnd, formattedTimer}) => {


    return <div id = {"interview-bar-wrapper"}>
            <div className={"rec-indicator"}></div>
            <p className={"timer"}>{formattedTimer}</p>
            <button className={"leave-button"} onClick={handleEnd}>Leave</button>
        </div>
}

export default InterviewBar