import React, {useState} from "react";
import "./ChangePass.css";
import Button from "../Button/Button";
import { useContext } from "react";
import { AppContext } from "../App";




const ChangePass = ({toggle}) => {

    const {accessToken} = useContext(AppContext)


    const [currentPass, setCurrentPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confirmNewPass, setConfirmNewPass] = useState("")
    const [msg, setMsg] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();

        setMsg("")
        if (newPass !=  confirmNewPass) {
            setMsg("Passwords Don't Match!");
            return;}

        try {

        const res = await fetch("https://impolite-buckle-harddisk.ngrok-free.dev/users/update_pass" ,{
            method:"PUT",
            headers: {"Content-Type":"application/json",
                    "Authorization" : `Bearer ${accessToken}`
            },
            body: JSON.stringify({current_password: currentPass, new_password: newPass})

        })
        if (res.ok) setMsg("Success. Password Changed!")
        else {const errData = await res.json();
            setMsg(errData.detail);}
        }


        catch (err) {
            console.log(err);
            }
    }

    return (
        <>

        <div id="change-pass-wrapper" onClick={() => toggle(false)}>

                <div id="change-pass-dialog" onClick={(e)=> e.stopPropagation()}>

                    <h2>Change Your Password</h2>

                    <form id="change-pass-form">
                        <label>Current Password</label>
                        <input type="password" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)}></input>

                        <label>New Password</label>
                        <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)}></input>

                         <label>Confirm New Password</label>
                        <input type="password" value={confirmNewPass} onChange={(e) => setConfirmNewPass(e.target.value)}></input>

                        <Button label={"Save Password"} onClick={handleSubmit} id={"save-pass-btn"}/>
                        {msg && <p>{msg}</p>}

                    </form>

                </div>


        </div>


        </>
    )
}

export default ChangePass