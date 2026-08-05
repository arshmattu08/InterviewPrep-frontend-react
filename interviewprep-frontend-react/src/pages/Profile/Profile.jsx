import React, {useState} from "react";
import "./Profile.css";
import HemiSphere from "../../components/HemiSphere/HemiSphere";
import Footer from "../../components/Footer/Footer";
import { AppContext } from "../../components/App";
import { useContext } from "react";
import Edit from "../../assets/edit.svg"
import Add from "../../assets/add.svg";
import Button from "../../components/Button/Button";
import ChangePass from "../../components/ChangePass/ChangePass";

const Profile = () => {

    const {currentUser,setCurrentUser,setCreditBoxOpen, accessToken} = useContext(AppContext)

    const [isEditingFirstName, setEditingFirstName] = useState(false)
    const [isEditingLastName, setEditingLastName] = useState(false)
    const [isEditingEmail, setEditingEmail] = useState(false)
    const[firstNameInput, setFirstNameInput] = useState("")
    const[lastNameInput, setLastNameInput] = useState("")
    const[emailInput, setEmailInput] = useState("")

    const [isCurrentPassOpen, setIsCurrentPassOpen] = useState(false)


    const handleSave = async (field, value, toggle) => {
        try {
        const response = await fetch("https://impolite-buckle-harddisk.ngrok-free.dev/users/me", {
            method:"PATCH",
            headers: {"Content-Type":"application/json",
                    "Authorization": `Bearer ${accessToken}`},
            body: JSON.stringify({[field]: value}) }
        )
        if (response.ok) {
                setCurrentUser(prev => ({...prev, [field] : value}))
                toggle(false)
                }
        }
            
        catch (err) {console.log(err)}
    
    }



    return (
        <>
        <HemiSphere/>

        <div id="profile-page-wrapper">

            <div id="profile-card">

                <div id="title">Profile Information</div>

                <div className="field">
                    <h3>First Name</h3>
                    {isEditingFirstName ? 
                    <input value={firstNameInput} onChange={(e)=> setFirstNameInput(e.target.value)}></input> :
                    <span><h3>{currentUser?.first_name}</h3></span>}
                    {isEditingFirstName && <Button label={"Save"} onClick={() => handleSave("first_name", firstNameInput, setEditingFirstName)}/>}
                    <img src={Edit} onClick={() => setEditingFirstName(!isEditingFirstName)}></img>
                </div>

                <div className="field">
                     <h3>Last Name</h3>
                    {isEditingLastName ? 
                    <input value={lastNameInput} onChange={(e)=> setLastNameInput(e.target.value)}></input> :
                    <span><h3>{currentUser?.last_name}</h3></span>}
                    {isEditingLastName && <Button label={"Save"} onClick={() => handleSave("last_name", lastNameInput, setEditingLastName)}/>}
                    <img src={Edit} onClick={() => setEditingLastName(!isEditingLastName)}></img>
                </div>

                <div className="field">
                     <h3>Email</h3>
                     {isEditingEmail ? 
                    <input value={emailInput} onChange={(e)=> setEmailInput(e.target.value)}></input> :
                    <span><h3>{currentUser?.email}</h3></span>}
                    {isEditingEmail && <Button label={"Save"} onClick={() => handleSave("email", emailInput, setEditingEmail)}/>}
                    <img src={Edit} onClick={()=> setEditingEmail(!isEditingEmail)}></img>
                </div>

                <div id="change-pass">
                    <Button label={"Change Password"} onClick={() => setIsCurrentPassOpen(true)}/>
                    {isCurrentPassOpen && <ChangePass toggle={setIsCurrentPassOpen}/>}
                </div>

                <div id="credit-balance">
                    <h5>Credit Balance:</h5>
                    <div> {currentUser?.credit_balance} </div>
                     <img src={Add} onClick={() => setCreditBoxOpen(true)}></img>

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