import React, {useState} from "react";
import "./Login.css";
import Hemisphere from "../../components/HemiSphere/HemiSphere";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../components/App";
import { useContext } from "react";

const Login = () => {

    const [loginForm, setloginForm] = useState({email:'',password:''})
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const {access_token ,setAccessToken, setLoggedIn, setCurrentUser} = useContext(AppContext)



    const handleChange = (event) => {
        setloginForm({...loginForm,[event.target.name]: event.target.value})
    }




    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage('')
        setError('')

        const res = await fetch("http://localhost:8000/login/", {
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

        }

        else if(!res.ok) {
            setError(data.detail)
            return;
        }

        const response = await fetch("http://localhost:8000/users/me",{
            headers: {"Content-Type":"application/json",
                    "Authorization": `Bearer ${data.access_token}`
            },
            credentials:"include",
        })

        const user = await response.json()

        if(response.ok){
            setCurrentUser(user)
            navigate("/UserLandingPage")
        }

        else if(!response.ok) {
            setError(user.detail)
            return;
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
                </form>

            </div>

        </div>

        <Footer/>

        </>
    )
}

export default Login