import React, {useState, useRef, useEffect} from "react";
import "./InterviewGrid.css";
import avatar from "../../assets/newavatar.jpeg";
import { AppContext } from "../App";
import { useContext } from "react";

const Grid = ({whoTalking}) => {

    const {currentUser, videoTrack} = useContext(AppContext)
    const userVideoRef = useRef(null);


    useEffect(() => {
        if (videoTrack.current) {
            userVideoRef.current.srcObject = new MediaStream([videoTrack.current])
        }
    }, [])



    return (
                <div id = {"grid-wrapper"}>

                    <div className={whoTalking == "ai" ? "avatar speaking" : "avatar"}>
                        <img className={"avatar-img"} src={avatar}/>
                    </div>

                    <div className={whoTalking == "user" ? "interviewee speaking" : "interviewee"}>
                        {videoTrack.current ? <video ref={userVideoRef} autoPlay muted playsInline style={{width:'100%', height:'100%', objectFit:'cover'}}/> : currentUser.first_name}
                    </div>




                </div>

            )

}

export default Grid 