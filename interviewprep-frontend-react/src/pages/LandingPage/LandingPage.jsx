import React from "react";
import "./LandingPage.css"
import { Link } from "react-router-dom";
import HemiSphere from "../../components/HemiSphere/HemiSphere";
import Button from "../../components/Button/Button";
import FAQItem from "../../components/FAQItem/FAQItem";


const LandingPage = () => {

    return (
        <>
        <HemiSphere/>

        <div id="hero-text">
            <p id="questions">Nervous about your next interview? </p>
            <p id="try-line"> Try <i>fyi</i> to simulate real world interviews.</p>

            <Button label={<b>Get Started!</b>}/>
        </div>

        <div id="faq-wrapper">

            <FAQItem question={"What is the app really about?"} answer={
                "It is about interview practice!"
            }/>
            <FAQItem question={"How much do I need to pay?"} answer={
                "Just $2.99 per 20 min session. It is pay as you go."
            }/>

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