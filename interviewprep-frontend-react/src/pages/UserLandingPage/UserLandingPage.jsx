import React from "react";
import "./UserLandingPage.css"
import HemiSphere from "../../components/HemiSphere/HemiSphere";
import Button from "../../components/Button/Button";
import { AppContext } from "../../components/App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


const UserLandingPage = () => {

    const {currentUser} = useContext(AppContext)
    const navigate = useNavigate()

    const handleBeginInterview = () => {
        navigate("/form")
    }



    return (
        <>
        <HemiSphere/>

        <div id="user_landing_wrapper">

            <h1>Welcome, {currentUser?.first_name}</h1>

            <Button label={"Begin Your Interview"} onClick={handleBeginInterview}/>

        </div>


        </>
    )
}

export default UserLandingPage