import React from "react";
import "./InterviewGrid.css";
import avatar from "../../assets/avatar2.jpeg";
import { AppContext } from "../App";
import { useContext } from "react";

const Grid = ({whoTalking}) => {

    const {currentUser} = useContext(AppContext)

    return (
                <div id = {"grid-wrapper"}>

                    <div className={whoTalking == "ai" ? "avatar speaking" : "avatar"}>
                        <img className={"avatar-img"} src={avatar}/>
                    </div>

                    <div className={whoTalking == "user" ? "interviewee speaking" : "interviewee"}>
                        {currentUser.first_name}
                    </div>




                </div>

            )

}

export default Grid 