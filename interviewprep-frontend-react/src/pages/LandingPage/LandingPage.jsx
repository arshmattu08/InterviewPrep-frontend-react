import React from "react";
import "./LandingPage.css"
import { Link } from "react-router-dom";
import HemiSphere from "../../components/HemiSphere/HemiSphere";
import Button from "../../components/Button/Button";
import FAQItem from "../../components/FAQItem/FAQItem";
import ProcessStep from "../../components/ProcessStep/ProcessStep";
import formicon from "../../assets/formicon.svg";
import headset from "../../assets/headset.svg";
import desktop from "../../assets/desktop.svg";
import IndianaMap from "../../assets/IndianaMap.svg";



const LandingPage = () => {

    const steps = [
        {number:1, title: "Form", text: "Fill out a form with appropriate job description and any extra context about you or the role/company you preparing for.", icon: formicon},
        {number:2, title: "Waiting Page", text: "This is where you’re ready to join the call and provide mic/camera permissions if needed.", icon: headset},
        {number:3, title: "Interview", text: "Interview begins!", icon: desktop}
    ];

    return (
        <>
        <HemiSphere/>

        <div id="hero-text">
            <p id="questions">Nervous about your next interview? </p>
            <p id="try-line"> Try <i>fyi</i> to simulate real world interviews.</p>

            <Button label={<b>Get Started!</b>}/>
        </div>

        <p className="titles">How It Works</p>

        <div id="process-steps-wrapper">
                    
                    {steps.map((step) => (
                        <ProcessStep key={step.number} {...step}/>
                    )) }

        </div>

        <p className="titles">Who We Are</p>

        <div id="who-we-are-wrapper">

                <div id="about">
                   The engineer and founder is based in Indiana and is a masters graduate in data science. This is an application built by a student, for students. We personally have faced challenges in preparing for interviews and the nerves that come with it. Research has shown that realistic practice with enough reps reduce interview anxiety and potentially improve performance. Most people don’t lack skills but lack enough reps to deliver them confidently. 
                    <br></br>
                    <br></br>
                    We hope you get value from this product and any feedback and criticism is welcome!
                </div>

                <div id="indiana-owned">
                    <img id = "indiana-map" src = {IndianaMap}></img>
                    <h2>INDIANA OWNED</h2>
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

        <div id="footer">
            <button className="footer-btn">Privacy Policy</button>
            <button className="footer-btn">Terms and Conditions</button>
            <button className="footer-btn">Contact Us</button>

        </div>


        </>
    )
}


export default LandingPage