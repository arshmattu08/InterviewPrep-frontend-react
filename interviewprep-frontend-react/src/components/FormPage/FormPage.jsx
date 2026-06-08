import React, {useState,useEffect} from "react";
import "./FormPage.css"

const FormPage = (props) => {

    const [jobDescription, setJobDescription] = useState('')
    const [additionalContext, setAdditionalContext] = useState('')
    const [recordingOption, setRecordingOption] = useState('No Recording')


    const handleSubmit = () => {
        console.log("submitted!")
        props.formSubmission(true);
    }

    return <div id = "user_form">
            <div>
                <label>Job Description:</label>
                <textarea value = {jobDescription} onChange={(e) => {setJobDescription(e.target.value)}} required></textarea>
            </div>

            <div>
                <label>Additional Context:</label>
                <textarea value = {additionalContext} onChange={(e) => {setAdditionalContext(e.target.value)}}
                placeholder="Please provide any additional context regarding the role you're preparing for" cols="100"></textarea>
            </div>


            <div>
                <label>Recording:</label>
                <select value={recordingOption} onChange={(e) => {setRecordingOption(e.target.value)}}>
                    <option value="No Recording">No Recording</option>
                    <option value="Audio Only"> Audio Only</option>
                    <option value="Audio and Video"> Audio and Video</option>

                </select>
            </div>

            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
}


export default FormPage