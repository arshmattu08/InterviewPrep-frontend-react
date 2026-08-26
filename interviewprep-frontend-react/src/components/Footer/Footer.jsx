import React, {useState} from "react";
import "./Footer.css";
import TermsConditions from "../TermsConditions/TermsConditions";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";

const Footer = () => {

    const [isTermsOpen, setIsTermsOpen] = useState(false)
    const [isPolicyOpen, setIsPolicyOpen] = useState(false)

    return (
        <>

        <div id="footer">
            <button className="footer-btn" onClick={() => setIsPolicyOpen(true)}>Privacy Policy</button>
            <button className="footer-btn" onClick={()=> setIsTermsOpen(true)}>Terms and Conditions</button>
            <a href="mailto: singharshpreet6060@gmail.com" className="footer-btn" style={{textDecoration:"none"}}>Contact Us</a>

            {isTermsOpen && <TermsConditions setIsTermsOpen={setIsTermsOpen}/>}
            {isPolicyOpen && <PrivacyPolicy setIsPolicyOpen={setIsPolicyOpen}/>}

        </div>
        
        </>
    )
}

export default Footer