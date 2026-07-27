import React from "react";
import "./Pricing.css";
import HemiSphere from "../../components/HemiSphere/HemiSphere";
import PricingTile from "../../components/PricingTile/PricingTile";
import Footer from "../../components/Footer/Footer";

const Pricing = () =>{

    return (
        <>
        <HemiSphere/>

        <div id="pricing-heading">
            <h1>Pricing</h1>
            <p style={{marginTop:'20px'}}>Note: Single 20 min interview = 10 credits.</p>
        </div>


        <div id="pricing-tile-wrapper">

            <PricingTile title={"PAY AS YOU GO"} dollars={"$2.99"} num_credits={"10 Credits"}/>
            <PricingTile title={"BUNDLE"} dollars={"$11.99"} num_credits={"50 Credits"}/>

        </div>

        <Footer/>


        </>
    )
}

export default Pricing