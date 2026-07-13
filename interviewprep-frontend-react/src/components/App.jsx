import React, {useState,useEffect, useRef} from "react"
import FormPage from "../Pages/FormPage/FormPage"
import InterviewWaitingPage from "../Pages/InterviewWaitingPage/InterviewWaitingPage"
import InterviewPage from "../Pages/InterviewPage/InterviewPage"
import InterviewDonePage from "./InterviewDone/InterviewDone"




const App = () => {

    const ws = useRef(null)
    const fileWriter = useRef(null)
    const sessionStream = useRef(null)
    const sessionRecorder = useRef(null)
    const greetingBuffer = useRef(null)
    const stream = useRef(null);
    const recordedChunks = useRef([])


    const [isFormSubmitted, setFormState] = useState(false)
    const [hasUserJoined, setJoinState] = useState(false)
    const [isUserDone, setUserDone] = useState(false)

   

    return (isUserDone ? <InterviewDonePage wsConn = {ws} recordedChunks={recordedChunks}/> 
            : hasUserJoined ? <InterviewPage wsConn ={ws} 
                                            sessionRec = {sessionRecorder} 
                                            fileW = {fileWriter} 
                                            greetingBuffer={greetingBuffer} 
                                            stream = {stream}
                                            userDone = {setUserDone}/> 
            : isFormSubmitted ? <InterviewWaitingPage joiningInterview = {setJoinState} 
                                                      wsConn = {ws}
                                                      fileW = {fileWriter}
                                                      sessionStr = {sessionStream}
                                                      sessionRec = {sessionRecorder}
                                                      greetingBuffer = {greetingBuffer}
                                                      stream ={stream}
                                                      recordedChunks={recordedChunks}/> 
            : <FormPage formSubmission ={setFormState}/>
            )
}


export default App