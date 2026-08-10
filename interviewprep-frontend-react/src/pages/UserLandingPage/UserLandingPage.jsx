import React from "react";
import "./UserLandingPage.css"
import HemiSphere from "../../components/HemiSphere/HemiSphere";
import Button from "../../components/Button/Button";
import { AppContext } from "../../components/App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import TypeWriter from "../../components/TypeWriter/TypeWriter";


const UserLandingPage = () => {

    const funFacts = ["Mock interviews improve efficacy and boosts confidence. (Wilkie & Rosendale, 2024)",
                     "How is it going?",
                     "Ready for some interview practice?",


    ]




    const {currentUser} = useContext(AppContext)
    const navigate = useNavigate()

    const handleBeginInterview = () => {
        navigate("/form")
    }



    return (
        <>
        <HemiSphere/>

        <div id="user_landing_wrapper">

            <p style={{marginTop:'75px',fontSize:'44px'}}>Welcome, <b>{currentUser?.first_name}</b></p>

            <div id="fun-facts-wrapper">
            <TypeWriter statementArray={funFacts} id="fun-facts"/>
            </div>

            <Button label={"Begin Your Interview"} onClick={handleBeginInterview}/>

        </div>

        <Footer/>
        </>
    )
}

export default UserLandingPage