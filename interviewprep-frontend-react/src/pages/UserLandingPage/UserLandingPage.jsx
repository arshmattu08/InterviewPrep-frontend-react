import React from "react";
import "./UserLandingPage.css"
import HemiSphere from "../../components/HemiSphere/HemiSphere";
import Button from "../../components/Button/Button";
import { AppContext } from "../../components/App";
import { useContext } from "react";


const UserLandingPage = () => {

    const {currentUser} = useContext(AppContext)


    return (
        <>
        <HemiSphere/>

        <div id="user_landing_wrapper">

            <h1>Welcome, {currentUser.first_name}</h1>

            <Button label={"Begin Your Interview"}/>

        </div>


        </>
    )
}

export default UserLandingPage