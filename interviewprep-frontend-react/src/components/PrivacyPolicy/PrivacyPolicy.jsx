import React, {useState} from "react";
import "./PrivacyPolicy.css";


const PrivacyPolicy = ({setIsPolicyOpen}) => {

    return (
        <>

        <div id="policy-wrapper" onClick={() => setIsPolicyOpen(false)}>

            <div id="inner-info" onClick={(e) => e.stopPropagation()}>

                <h2>Privacy Policy</h2>

                <div id="scroll-content">

                    <h3>Effective Date: August 6, 2026</h3>

                    <h3>1. Information We Collect</h3>
                    <p>- <b>Account Information:</b> name, email, password (hashed).</p>
                    <p>- <b>Payment Information:</b>  processed securely by Stripe; we do not store card details.</p>
                    <p>- <b>Session Audio:</b> your voice during a mock interview session, processed in real time.</p>

                     <h3>2. How We Use Your Information</h3>
                    <p>- To provide and operate the interview practice service</p>
                    <p>- To process payments and manage credits</p>
                    <p>- To improve our service through aggregated, non-identifying usage data</p>

                    <h3>3. Recordings and Audio Data</h3>
                    <p><b>Your voice recordings are not saved or stored.</b> Audio is streamed in real time for transcription and AI response generation, and is cleared as soon as your session ends. No one, including fyi staff, has access to a saved recording of your session, because none exists after the session concludes.</p>

                     <h3>4. Third-Party Services</h3>
                    <p>We use trusted third-party providers to operate the service:</p>
                    <p>- <b>Stripe</b> — payment processing</p>
                    <p>- <b>Deepgram</b> — real-time speech-to-text transcription</p>
                    <p>- <b>OpenAI</b> — AI-generated interview responses and feedback</p>

                    <p>These providers process data only as needed to deliver the service and are bound by their own privacy and security obligations.</p>

                     <h3> 5. Cookies and Authentication</h3>
                    <p>We use secure, httpOnly cookies for authentication (refresh tokens) to keep you logged in. We do not use cookies for advertising or tracking.</p>

                     <h3> 6. Data Retention</h3>
                    <p>- Account information is retained while your account is active.</p>
                    <p>- Session audio is not retained.</p>
                    <p>- You may request account and data deletion at any time.</p>

                     <h3>7. Your Rights</h3>
                    <p>You may:</p>
                    <p>- Access or update your account information</p>
                    <p>- Request deletion of your account and associated data</p>
                    <p>- Contact us with privacy questions or concerns</p>

                    <h3>8. Data Security</h3>
                    <p>We use industry-standard measures (encrypted connections, hashed passwords, server-side authentication) to protect your data.</p>

                    <h3> 9. Changes to This Policy</h3>
                    <p>We may update this Privacy Policy from time to time. Continued use of the service after changes constitutes acceptance.</p>

                    <h3>10. Contact</h3>
                    <p>Questions about this Privacy Policy can be sent to: singharshpreet6060@gmail.com</p>




                </div>

            </div>

        </div>
        </>
    )
}

export default PrivacyPolicy