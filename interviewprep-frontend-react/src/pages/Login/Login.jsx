import React, {useState, useEffect} from "react";
import "./Login.css";
import Hemisphere from "../../components/HemiSphere/HemiSphere";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../components/App";
import { useContext } from "react";
import { useSearchParams } from 'react-router-dom';

const Login = () => {

    const [searchParams] = useSearchParams();

    const [loginForm, setloginForm] = useState({email:'',password:''})
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [needsVerification, setNeedsVerification] = useState(false)
    const navigate = useNavigate()
    const {access_token ,setAccessToken, setLoggedIn, setCurrentUser, getUser} = useContext(AppContext)

    useEffect(() => {

        const verify = async () => {

            const token = searchParams.get("token");
            console.log(`Received token length: ${token?.length}, token: ${token}`);
            if (!token) return;

            const verify_response = await fetch(`${import.meta.env.VITE_BE_URL}/verify_email?token=${token}`, {
                 headers: { "ngrok-skip-browser-warning": "true" }
            })

            const email_data = await verify_response.json()

                if (verify_response.ok) {
                    console.log(message)
                    setMessage("Email SuccessFully Verified! You can log in now.")
                }

                else if (!verify_response.ok) {
                    console.log(message)
                    setMessage(email_data.detail)
                }

        }
    verify();
    },[])


    const verify_again = async () => {
        const resendRes = await fetch(`${import.meta.env.VITE_BE_URL}/resend_verification`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: loginForm.email})
        })

        const resendData = await resendRes.json()

        if (resendRes.ok) {
            setMessage(resendData.message)
        }

        else if (!resendRes.ok) {
            setError(resendData.detail)
        }

    }






    const handleChange = (event) => {
        setloginForm({...loginForm,[event.target.name]: event.target.value})
    }




    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage('')
        setError('')

        const res = await fetch(`${import.meta.env.VITE_BE_URL}/login`, {
            method:"POST",
            headers: {"Content-Type":"application/json"},
            credentials:"include",
            body: JSON.stringify(loginForm)
        })

        const data = await res.json()
        console.log(data)

        if(res.ok){
             setMessage("Login Successful")
             setAccessToken(data.access_token)
             setLoggedIn(true)
             getUser(data.access_token)
             navigate("/UserLandingPage")
             return;

        }

        else if(!res.ok) {
            setError(data.detail)
        }

        if(data.detail == "Please verify your account first.") {
            setNeedsVerification(true);
        }

    }


    return (
        <>
        <Hemisphere/>

        <div id="login-wrapper">

            <div id="login-form">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input name="email" type="email" value={loginForm.email} onChange={handleChange} required/>
                    </div>

                     <div>
                        <label>Password:</label>
                        <input name="password" type="password" value={loginForm.password} onChange={handleChange} required/>
                    </div>
                
                <p style={{color:'#0687FF',marginTop:'-12px', marginBottom:'-20px', cursor:'pointer'}}>Forgot Password?</p>

                <Button type="submit" label={<b>Login</b>}/>

                {message && <p style={{color:'green',paddingLeft:'100px'}}>{message}</p>}
                {error && <p style={{color:'red', paddingLeft:'100px'}}>{error}</p>}
                {needsVerification && (
                    <p style={{cursor: 'pointer', color: 'blue', textDecoration:'underline'}} onClick={verify_again}>
                        Resend Email Verification
                    </p>
                )}
                </form>

            </div>

        </div>

        <Footer/>

        </>
    )
}

export default Login