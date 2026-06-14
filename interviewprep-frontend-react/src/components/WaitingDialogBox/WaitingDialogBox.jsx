import React, {useState} from "react";
import "./WaitingDialogBox.css"


const WaitingDialogBox = ({joinInterview, getPermissions, interviewData, isUserReady}) => {


    return (
        <div id = "dialog-box-wrapper">

        <h2 className={"welcome-msg"}>Welcome to your mock interview!</h2>


            <div className={"panel-wrapper"}>
                <div id = "inner-wrapper">

                    <p>Waiting Room</p>
                    <div>{isUserReady && <p>Interviewer will let you in. Please wait.</p>}</div>
                </div>

                <div className={"support-info"}>
                    <p>Permissions</p>
                    <p>{interviewData.recordingOption}</p>

                </div>
            </div>

        <button className={"join-btn"} onClick={joinInterview}>Join</button>

        </div>
    )

///// USE FLEX AS PARENT FOR INFO PANELS
}





export default WaitingDialogBox