import React from "react";
import "./Button.css";


const Button = ({id="", type='button',label, onClick}) => {

    return (
        <>
        <button id= {id} type= {type} className="my-button" onClick={onClick}> {label} </button>
        </>
    )
}

export default Button