import React, {useState} from "react";
import "./SignUp.css";
import HemiSphere from "../../components/HemiSphere/HemiSphere";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const SignUp = () => {

const [formData, setFormData] = useState({firstName:'', lastName:'', email:'', password:''})
const [confirmPassword, setConfirmPassword] = useState('')
const [msg, setMsg] = useState('')

const handleChange = (e) => {
 setFormData({...formData, [e.target.name]: e.target.value})
}

const handleSubmit =  async(e) => {
    e.preventDefault();

    if (formData.password != confirmPassword) {
        setMsg("Passwords don't match!")
        return;}
    else {
        setMsg('')
    }

    const res = await fetch("http://localhost:8000/users/",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            password: formData.password
    })
    })

    setMsg('Sign Up Successful')

    const data = await res.json()
    console.log(data)


    
}

    return (
        <>
        <HemiSphere/>

        <div id="signup-wrapper">

            <div id="signup-form">

                <h1>Sign Up</h1>

                <form onSubmit={handleSubmit}>

                    <div>
                        <label>First Name:</label>
                        <input name="firstName" value={formData.firstName} onChange={handleChange}/>
                    </div>

                    <div>
                        <label>Last Name:</label>
                        <input name="lastName"  value={formData.lastName} onChange={handleChange}/>
                    </div>

                    <div>
                        <label>Email:</label>
                        <input name="email"  type="email" value={formData.email} onChange={handleChange}/>
                     </div>

                    <div>
                        <label>Password:</label>
                        <input name="password"  type="password" value={formData.password} onChange={handleChange}/>
                     </div>

                      <div>
                        <label>Confirm Password:</label>
                        <input name="confirmpassword" type="password" value={confirmPassword} onChange={(e) => (setConfirmPassword(e.target.value))}/>
                     </div>

                     <Button type="submit" label={"Sign Up"}/>

                     {msg && <p style={{alignSelf:'center', marginRight:'80px'}}>{msg}</p>}

                </form>

                <p>Already have an account? <Link to={"/login"}> <b style={{color:'#0687FF', cursor:'pointer'}}>Login</b> </Link> </p>
                
            </div>

        </div>

        <Footer/>


        </>
    )
}

export default SignUp