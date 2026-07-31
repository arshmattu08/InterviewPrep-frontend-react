import React, {useState,useEffect, useRef, createContext} from "react"
import FormPage from "../pages/FormPage/FormPage"
import InterviewWaitingPage from "../pages/InterviewWaitingPage/InterviewWaitingPage"
import InterviewPage from "../pages/InterviewPage/InterviewPage"
import InterviewDonePage from "./InterviewDone/InterviewDone"
import LandingPage from "../pages/LandingPage/LandingPage"
import UserLandingPage from "../pages/UserLandingPage/UserLandingPage"
import Pricing from "../pages/Pricing/Pricing"
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

const AppContext = createContext();

const AppProvider = ({children}) => {
        const ws = useRef(null)
        const fileWriter = useRef(null)
        const sessionStream = useRef(null)
        const sessionRecorder = useRef(null)
        const greetingBuffer = useRef(null)
        const stream = useRef(null);
        const recordedChunks = useRef([])

        const [accessToken, setAccessToken] = useState(null)
        const [isCheckingAuth, setCheckingAuth] = useState(true)
        const [isLoggedIn, setLoggedIn] = useState(false)
        const [currentUser, setCurrentUser] = useState({})
        const [isCreditBoxOpen, setCreditBoxOpen] = useState(false)

        useEffect(() => {
            // every time user refreshes, context resets so we're getting user info and auth on refresh/mount.

            const getUser = async (token) => {
                const response = await fetch("http://localhost:8000/users/me",{
                         headers: {"Content-Type":"application/json",
                                  "Authorization": `Bearer ${token}` },
                                 credentials:"include",
            })

            const user = await response.json()

             if(response.ok){
            setCurrentUser(user)
            
            }

            else if(!response.ok) {
            setError(user.detail)
            return;
            }} 

            const checkAuth = async () => {
                try {
                    const res = await fetch ("http://localhost:8000/refresh", {method:"POST", credentials:"include"}) //include current refresh cookie
                
                if (res.ok) {
                    const data = await res.json();
                    setAccessToken(data.access_token)
                    setLoggedIn(true)
                    await getUser(data.access_token)
                }
            }

            catch (err) {console.log(err)}

            finally{setCheckingAuth(false)}

        }

            checkAuth();


        }, [])

        return (
            <AppContext.Provider value={{ws,fileWriter,sessionStream,sessionRecorder,greetingBuffer, isLoggedIn, setLoggedIn,
                                        stream,recordedChunks, accessToken, setAccessToken, isCheckingAuth,
                                        currentUser, setCurrentUser, isCreditBoxOpen, setCreditBoxOpen}}>
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
                <Route path="/pricing" element={<Pricing/>}/>
                <Route path="/account" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/UserLandingPage" element = {
                    <ProtectedRoute> <UserLandingPage/>  </ProtectedRoute> } />
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




