import React, {useState} from "react";
import "./TermsConditions.css";

const TermsConditions = ({setIsTermsOpen}) => {

    

    return (
        <>
        <div id="info-wrapper" onClick={()=> setIsTermsOpen(false)}>

            <div id="inner-info" onClick={(e)=> e.stopPropagation()}>

                <h2>Terms and Conditions</h2>

                <div id="scroll-content">
                    <h3>Effective Date: August 6, 2026</h3>

                    <h3> 1. Acceptance of Terms</h3>
                    <p>By accessing or using fyi (foryourinterview.com), you agree to these Terms and Conditions. If you do not agree, do not use the service.</p>

                    <h3>2. Service Description</h3>
                    <p>fyi provides AI-powered voice mock interview sessions for practice purposes. Sessions are conducted via real-time voice interaction with an AI interviewer.</p>

                    <h3>3. Accounts</h3>
                    <p>You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.</p>

                    <h3> 4. Credits and Payments</h3>
                    <p> - Sessions are accessed via a pay-per-session credit system.</p>
                    <p>- Credits are purchased through our payment processor (Stripe) and deducted upon starting a session.</p>
                    <p>- Credits are non-refundable except as required by law or at our discretion.</p>

                    <h3>5. Recordings</h3>
                    <p>Your voice is processed in real time to enable the interview session. <b>Recordings are not saved or stored, and are not viewable by anyone, including fyi staff.</b> Audio is cleared immediately after your session ends. See our Privacy Policy for details.</p>

                    <h3>6. Acceptable Use</h3>
                    <p>You agree not to:</p>
                    <p>- Use the service for unlawful purposes</p>
                    <p>- Attempt to reverse-engineer, disrupt, or exploit the platform</p>
                    <p>- Share your account with others</p>

                    <h3>7. No Guarantee of Outcome</h3>
                    <p>fyi is a practice tool. We do not guarantee interview performance, admissions, or employment outcomes.</p>

                     <h3>8. Intellectual Property</h3>
                    <p>All content, branding, and software associated with fyi are owned by fyi and may not be copied or redistributed without permission.</p>

                     <h3>9. Limitation of Liability</h3>
                    <p>fyi is provided "as is" without warranties of any kind. We are not liable for indirect, incidental, or consequential damages arising from use of the service.</p>

                     <h3>10. Termination</h3>
                    <p>We reserve the right to suspend or terminate accounts that violate these terms.</p>

                     <h3>11. Changes to Terms</h3>
                    <p>We may update these Terms at any time. Continued use of the service after changes constitutes acceptance.</p>

                     <h3>12. Contact</h3>
                    <p>Questions about these Terms can be sent to: singharshpreet6060@gmail.com</p>

                </div>

            </div>

        </div>
        </>
    )
}

export default TermsConditions