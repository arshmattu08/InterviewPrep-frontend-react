import React from "react";
import "./InterviewGrid.css";
import avatar from "../../assets/avatar1.jpg"

const Grid = () => {

    return (
                <div id = {"grid-wrapper"}>

                    <div className={"avatar"}>
                        <img className={"avatar-img"} src={avatar}/>
                    </div>

                    <div className={"interviewee"}>
                        You
                    </div>




                </div>

            )

}

export default Grid 