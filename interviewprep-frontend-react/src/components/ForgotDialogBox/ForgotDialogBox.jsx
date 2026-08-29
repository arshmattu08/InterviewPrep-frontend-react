import React, {useState} from "react";
import "./ForgotDialogBox.css";
import Button from "../Button/Button";


const ForgotDialogBox = ({toggle, forgotPassToken}) => {

    const [newPass , setNewPass] = useState("")
    const [confirmNewPass, setConfirmNewPass] = useState("")
    const [msg, setMsg] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();

         setMsg("")
            if (newPass !=  confirmNewPass) {
            setMsg("Passwords Don't Match!");
            return;}

        try {

        const res = await fetch(`${import.meta.env.VITE_BE_URL}/users/update_forgot_pass` ,{
            method:"PUT",
            headers: {"Content-Type":"application/json",
            },
            body: JSON.stringify({token: forgotPassToken, new_password: newPass})

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

        <div id="forgot-wrapper" onClick={() => toggle(false)}>

            <div id="inner-dialog-box" onClick={(e) => e.stopPropagation()}>
                <h2>Change Your Password</h2>

                    <form id="change-forgotPass-form">
                      
                        <label>New Password</label>
                        <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)}></input>

                         <label>Confirm New Password</label>
                        <input type="password" value={confirmNewPass} onChange={(e) => setConfirmNewPass(e.target.value)}></input>

                        <Button label={"Save New Password"} onClick={handleSubmit} id={"save-pass-btn"}/>
                        {msg && <p>{msg}</p>}

                    </form>

            </div>

        </div>
        </>
    )
}

export default ForgotDialogBox