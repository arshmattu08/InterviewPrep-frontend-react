import React from "react";
import "./LandingPage.css"
import { Link } from "react-router-dom";
import HemiSphere from "../../components/HemiSphere/HemiSphere";
import Button from "../../components/Button/Button";
import FAQItem from "../../components/FAQItem/FAQItem";
import ProcessStep from "../../components/ProcessStep/ProcessStep";


const LandingPage = () => {

    const steps = [
        {number:1, title: "Form", text: "Fill out a form with appropriate job description and any extra context about you or the role/company you preparing for.", icon: ""},
        {number:2, title: "Waiting Page", text: "This is where you’re ready to join the call and provide mic/camera permissions if needed.", icon: ""},
        {number:3, title: "Interview", text: "Interview begins!", icon: ""}
    ];

    return (
        <>
        <HemiSphere/>

        <div id="hero-text">
            <p id="questions">Nervous about your next interview? </p>
            <p id="try-line"> Try <i>fyi</i> to simulate real world interviews.</p>

            <Button label={<b>Get Started!</b>}/>
        </div>

        

        <div id="process-steps-wrapper">

            <p>How It Works</p>
                    
                <div id="process-steps">

                    {steps.map((step) => (
                        <ProcessStep key={step.number} {...step}/>
                    )) }

                </div>



        </div>



        <div id="faq-wrapper">

            <div id="faq-title">
                <h1>Frequently Asked Questions (FAQs)</h1>
                </div>

            <FAQItem question={"What is the app really about?"} answer={
                "It is about interview practice!"
            }/>
            <FAQItem question={"How much do I need to pay?"} answer={
                "Just $2.99 per 20 min session. It is pay as you go."
            }/>

        </div>


        </>
    )
}


export default LandingPage