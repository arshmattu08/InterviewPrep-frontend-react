import React, {useState,useEffect, useRef} from "react"
import FormPage from "./FormPage/FormPage"
import InterviewWaitingPage from "./InterviewWaitingPage/InterviewWaitingPage"
import InterviewPage from "./InterviewPage/InterviewPage"




const App = () => {

    const ws = useRef(null)
    const fileWriter = useRef(null)
    const sessionStream = useRef(null)
    const sessionRecorder = useRef(null)

    const [isFormSubmitted, setFormState] = useState(false)
    const [hasUserJoined, setJoinState] = useState(false)

   

    return (  hasUserJoined ? <InterviewPage wsConn ={ws} sessionRec = {sessionRecorder} fileW = {fileWriter}/> 
            : isFormSubmitted ? <InterviewWaitingPage joiningInterview = {setJoinState} 
                                                      wsConn = {ws}
                                                      fileW = {fileWriter}
                                                      sessionStr = {sessionStream}
                                                      sessionRec = {sessionRecorder}/> 




            : <FormPage formSubmission ={setFormState}/>
            )
}


export default App