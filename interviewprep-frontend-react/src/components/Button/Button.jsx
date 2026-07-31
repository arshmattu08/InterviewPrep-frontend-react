import React from "react";
import "./Button.css";


const Button = ({id="", type='button',label}) => {

    return (
        <>
        <button id= {id} type= {type} className="my-button">{label}</button>
        </>
    )
}

export default Button