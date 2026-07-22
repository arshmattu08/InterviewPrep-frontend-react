import React from "react";
import "./Button.css";


const Button = ({type='button',label}) => {

    return (
        <>
        <button type= {type} className="my-button">{label}</button>
        </>
    )
}

export default Button