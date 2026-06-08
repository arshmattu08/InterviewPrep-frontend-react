import React, {useState,useEffect} from "react"
import FormPage from "./FormPage/FormPage"
import InterviewWaitingPage from "./InterviewWaitingPage/InterviewWaitingPage"
import InterviewPage from "./InterviewPage/InterviewPage"

const App = () => {

    const [isFormSubmitted, setFormState] = useState(false)
    const [hasUserJoined, setJoinState] = useState(false)

    return (hasUserJoined ? <InterviewPage/> 
            : isFormSubmitted ? <InterviewWaitingPage joiningInterview = {setJoinState}/> 
            : <FormPage formSubmission ={setFormState}/>
            )
}


export default App