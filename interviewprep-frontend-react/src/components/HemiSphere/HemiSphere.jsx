import React from "react";
import "./HemiSphere.css";
import Logo from "../../assets/logo1.svg";
import { Link } from "react-router-dom";


const HemiSphere = () => {


    return (
        <>
        
            
          <div id="hemisphere">

            <Link to={"/pricing"}> <button id= "pricing" className="nav-btn">Pricing</button> </Link>
            <Link to={"/"}> <img id = "logo" src={Logo}></img> </Link>
            <Link to={"/account"}> <button id="account" className="nav-btn">Account</button> </Link>
            <button id="resources"className="nav-btn">Resources</button>











          </div>
        
        </>
    )
}

export default HemiSphere;