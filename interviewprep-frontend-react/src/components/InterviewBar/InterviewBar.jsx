import React from "react";
import "./InterviewBar.css"

const InterviewBar = ({handleEnd, formattedTimer}) => {


    return <div id = {"interview-bar-wrapper"}>
            <p className={"timer"}>{formattedTimer}</p>
            <button className={"leave-button"} onClick={handleEnd}>Leave</button>
        </div>
}
// PLAN IS TO CREATE A DIV with PURPLE BACKGROUND AND ADD ELEMENTS TO IT.
export default InterviewBar