import React from "react";
import "./FormCard.css"


const FormCard = ({jobDescription, setJobDescription, additionalContext, setAdditionalContext,
                    recordingOption,setRecordingOption, handleSubmit}) => {


    return <div id = "user_form_wrapper">
            <div>
                <h2 className={"form-title label"}>Pre-Interview Data Form</h2>
            </div>

            <div>
                <label className={"label"}>Job Description:</label>
                <textarea className={"text-area"} value = {jobDescription} onChange={(e) => {setJobDescription(e.target.value)}} required></textarea>
            </div>

            <div>
                <label className={"label"}>Additional Context:</label>
                <textarea className={"text-area"} value = {additionalContext} onChange={(e) => {setAdditionalContext(e.target.value)}}
                placeholder="Please provide any additional context regarding the role you're preparing for." cols="100"></textarea>
            </div>


            <div>
                <label className={"label"}>Recording (only chrome is supported as of now):</label>
                <select value={recordingOption} onChange={(e) => {setRecordingOption(e.target.value)}}>
                    <option value="No Recording">No Recording</option>
                    <option value="Audio Only"> Audio Only</option>
                    <option value="Audio and Video"> Audio and Video</option>

                </select>
            </div>
                        <br></br>
            <div>
                <button className={"submit-btn"} onClick={handleSubmit}>Submit</button>
            </div>

        </div>
}

export default FormCard