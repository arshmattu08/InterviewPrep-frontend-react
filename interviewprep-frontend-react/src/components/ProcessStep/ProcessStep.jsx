import React from "react";
import "./ProcessStep.css";


const ProcessStep = ({number, title, text, icon}) => {

    return (
        <>
        <div id="process-step">
            <div id="number-div">{number}</div>
            <h2>{title}</h2>
            <p id="text">{text}</p>
            <img className="icons" src= {icon}></img>
            

        </div>

        </>
    )
}

export default ProcessStep