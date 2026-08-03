import React from "react";
import "./Profile.css";
import HemiSphere from "../../components/HemiSphere/HemiSphere";
import Footer from "../../components/Footer/Footer";

const Profile = () => {

    return (
        <>
        <HemiSphere/>

        <div id="profile-page-wrapper">

            <div id="profile-card">

                <div id="title">Profile Information</div>

                <div className="field">
                    <h5>First Name</h5>
                    <input></input>
                </div>

                <div className="field">
                     <h5>Last Name</h5>
                    <input></input>
                </div>

                <div className="field">
                     <h5>Email</h5>
                    <input></input>
                </div>

                <div className="field">
                     <h5>Change Password</h5>
                    <input></input>
                </div>

                <div id="credit-balance">
                    <h5>Credit Balance:</h5>
                    <div>0</div>
                </div>
                <div id="delete-account">
                    <p>Want to delete account?</p>
                    <button>DELETE</button>
                </div>
                
        
            </div>


        </div>


        <Footer/>
        </>
    )
}

export default Profile