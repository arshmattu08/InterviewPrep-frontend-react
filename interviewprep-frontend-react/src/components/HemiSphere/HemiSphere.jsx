import React from "react";
import "./HemiSphere.css";
import Logo from "../../assets/logo1.svg"


const HemiSphere = () => {


    return (
        <>
        
            
          <div id="hemisphere">

            <button id= "pricing" className="nav-btn">Pricing</button>
            <img id = "logo" src={Logo}></img>
            <button id="account" className="nav-btn">Account</button>
            <button id="resources"className="nav-btn">Resources</button>











          </div>
        
        </>
    )
}

export default HemiSphere;