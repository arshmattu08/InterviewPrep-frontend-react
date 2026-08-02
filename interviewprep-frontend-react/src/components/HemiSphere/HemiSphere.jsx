import React from "react";
import "./HemiSphere.css";
import Logo from "../../assets/logo1.svg";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CreditDialogBox from "../CreditDialogBox/CreditDialogBox";


const HemiSphere = () => {

    const navigate = useNavigate()

    const {isLoggedIn, setLoggedIn, setAccessToken, currentUser, isCreditBoxOpen, setCreditBoxOpen} = useContext(AppContext)

    const logOut = async () => {

      try{
      await fetch("https://impolite-buckle-harddisk.ngrok-free.dev/logout", {
        method:"POST",
        credentials: "include"
      }); }

      catch (err) {console.log(err)}

      finally{
      setAccessToken(null)
      setLoggedIn(false)
      navigate("/login")}
      
    }

    const handleAddCredits = () => {
      setCreditBoxOpen(true)
    }





    return (
        <>
        
          {!isLoggedIn && 
          <div id="hemisphere">

            <Link to={"/pricing"}> <button id= "pricing" className="nav-btn">Pricing</button> </Link>
            <Link to={"/"}> <img id = "logo" src={Logo}></img> </Link>
            <Link to={"/account"}> <button id="account" className="nav-btn">Account</button> </Link>
            <button id="resources"className="nav-btn">Resources</button>
          </div> }

          {isLoggedIn && 
          <div id="hemisphere">


            <Link to={"/pricing"}> <button id= "pricing" className="nav-btn">Pricing</button> </Link>
            <Link to={"/pricing"}> <button id= "profile" className="nav-btn">Profile</button> </Link>
            <Link to={"/"}> <img id = "logo" src={Logo}></img> </Link>
            <button id="account" className="nav-btn" onClick={logOut}>Log Out</button> 
            <span id="credit-score">Credits: {currentUser.credit_balance} </span>
             <div id="add-credits" onClick={handleAddCredits}>+ Add Credits </div>

             {isCreditBoxOpen && <CreditDialogBox/>}
          </div>
          
          }
        
        </>
    )
}

export default HemiSphere;