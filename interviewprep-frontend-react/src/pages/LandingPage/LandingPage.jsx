import React from "react";
import "./LandingPage.css"
import { Link } from "react-router-dom";
import HemiSphere from "../../components/HemiSphere/HemiSphere";
import Button from "../../components/Button/Button";


const LandingPage = () => {

    return (
        <>
        <HemiSphere/>

        <div id="hero-text">
            <p id="questions">Nervous about your next interview? </p>
            <p id="try-line"> Try <i>fyi</i> to simulate real world interviews.</p>

            <Button label={<b>Get Started!</b>}/>
        </div>

        {/* <Button label={<b>Get Started!</b>}/> */}



        {/* <h1>This is home page</h1>
        <Link to={"/form"}>Form</Link> */}

        {/* <Link to={"/waitingpage"}>WaitingPage</Link>
        <Link to={"/interviewpage"}>InterviewPage</Link>
        <Link to={"/interviewdonepage"}>DonePage</Link> */}

        </>
    )
}


export default LandingPage