import React, {useState,useEffect} from "react";
import "./FormPage.css"
import FormCard from "../FormCard/FormCard";

const FormPage = (props) => {

    const [jobDescription, setJobDescription] = useState('')
    const [additionalContext, setAdditionalContext] = useState('')
    const [recordingOption, setRecordingOption] = useState('No Recording')


    const handleSubmit = () => {
        console.log("submitted!")
        if (!jobDescription.trim()) return;
        localStorage.setItem("interviewData", JSON.stringify({jobDescription,additionalContext,recordingOption}))
        props.formSubmission(true);
    }

    return (
        // On this formPage we can return the Card plus navbar and stuff in the future.

        <FormCard
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
        additionalContext={additionalContext}
        setAdditionalContext={setAdditionalContext}
        recordingOption={recordingOption}
        setRecordingOption={setRecordingOption}
        handleSubmit={handleSubmit}
        />
    )

}
export default FormPage