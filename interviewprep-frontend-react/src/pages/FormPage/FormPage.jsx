import React, {useState,useEffect} from "react";
import "./FormPage.css"
import FormCard from "../../components/FormCard/FormCard"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../components/App";

const FormPage = () => {

    const [jobDescription, setJobDescription] = useState('')
    const [additionalContext, setAdditionalContext] = useState('')
    const [recordingOption, setRecordingOption] = useState('No Recording')
    const {currentUser} = useContext(AppContext)
    const navigate = useNavigate()


    const handleSubmit = () => {
        console.log("submitted!")
        if (!jobDescription.trim()) return;
        if (currentUser.credit_balance < 1){
            alert("Not enough credits!")
            return;
        }
        localStorage.setItem("interviewData", JSON.stringify({jobDescription,additionalContext,recordingOption}))
        navigate("/waitingpage")
    }

    return (
        // On this formPage we can return the Card plus navbar and stuff in the future.
        <div id="form-wrapper">
            <FormCard
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            additionalContext={additionalContext}
            setAdditionalContext={setAdditionalContext}
            recordingOption={recordingOption}
            setRecordingOption={setRecordingOption}
            handleSubmit={handleSubmit}
            />
        </div>
    )

}
export default FormPage