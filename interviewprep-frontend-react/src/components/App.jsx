import React, {useState,useEffect, useRef, createContext} from "react"
import FormPage from "../pages/FormPage/FormPage"
import InterviewWaitingPage from "../pages/InterviewWaitingPage/InterviewWaitingPage"
import InterviewPage from "../pages/InterviewPage/InterviewPage"
import InterviewDonePage from "./InterviewDone/InterviewDone"
import LandingPage from "../pages/LandingPage/LandingPage"

// Routing for Page Navigation
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

const AppContext = createContext();

const AppProvider = ({children}) => {
        const ws = useRef(null)
        const fileWriter = useRef(null)
        const sessionStream = useRef(null)
        const sessionRecorder = useRef(null)
        const greetingBuffer = useRef(null)
        const stream = useRef(null);
        const recordedChunks = useRef([])

        return (
            <AppContext.Provider value={{ws,fileWriter,sessionStream,sessionRecorder,greetingBuffer,stream,recordedChunks}}>
                {children}
            </AppContext.Provider>
        )
        
        }


const App = () => {
    return (

        <AppProvider>
            <Router>
             <Routes>

                <Route path="/" element={<LandingPage/>}/>
                <Route path="/form" element={<FormPage/>}/>
                <Route path="/waitingpage" element={<InterviewWaitingPage/>}/>
                <Route path="/interviewpage" element={<InterviewPage/>}/>
                <Route path="/interviewdonepage" element={<InterviewDonePage/>}/>


             </Routes>
            </Router>

        </AppProvider>

    )

   }

export default App
export { AppContext };

// const App = () => {

//     const ws = useRef(null)
//     const fileWriter = useRef(null)
//     const sessionStream = useRef(null)
//     const sessionRecorder = useRef(null)
//     const greetingBuffer = useRef(null)
//     const stream = useRef(null);
//     const recordedChunks = useRef([])


//     const [isFormSubmitted, setFormState] = useState(false)
//     const [hasUserJoined, setJoinState] = useState(false)
//     const [isUserDone, setUserDone] = useState(false)

   

//     return (isUserDone ? <InterviewDonePage wsConn = {ws} recordedChunks={recordedChunks}/> 
//             : hasUserJoined ? <InterviewPage wsConn ={ws} 
//                                             sessionRec = {sessionRecorder} 
//                                             fileW = {fileWriter} 
//                                             greetingBuffer={greetingBuffer} 
//                                             stream = {stream}
//                                             userDone = {setUserDone}/> 
//             : isFormSubmitted ? <InterviewWaitingPage joiningInterview = {setJoinState} 
//                                                       wsConn = {ws}
//                                                       fileW = {fileWriter}
//                                                       sessionStr = {sessionStream}
//                                                       sessionRec = {sessionRecorder}
//                                                       greetingBuffer = {greetingBuffer}
//                                                       stream ={stream}
//                                                       recordedChunks={recordedChunks}/> 
//             : <FormPage formSubmission ={setFormState}/>
//             )
   
// }


