import React from "react";
import "./InterviewGrid.css";
import avatar from "../../assets/avatar2.jpeg"

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