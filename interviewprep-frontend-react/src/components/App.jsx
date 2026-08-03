import React, {useState,useEffect, useRef, createContext} from "react"
import FormPage from "../pages/FormPage/FormPage"
import InterviewWaitingPage from "../pages/InterviewWaitingPage/InterviewWaitingPage"
import InterviewPage from "../pages/InterviewPage/InterviewPage"
import InterviewDonePage from "./InterviewDone/InterviewDone"
import LandingPage from "../pages/LandingPage/LandingPage"
import UserLandingPage from "../pages/UserLandingPage/UserLandingPage"
import Pricing from "../pages/Pricing/Pricing";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
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


        const getUser = async (token) => {
                const response = await fetch("https://impolite-buckle-harddisk.ngrok-free.dev/users/me",{
                         headers: {"Content-Type":"application/json",
                                  "Authorization": `Bearer ${token}`,
                                  "ngrok-skip-browser-warning": "true"},
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

        useEffect(() => {
            // every time user refreshes, context resets so we're getting user info and auth on refresh/mount.
            const checkAuth = async () => {
                try {
                    const res = await fetch ("https://impolite-buckle-harddisk.ngrok-free.dev/refresh", {method:"POST", credentials:"include"}) //include current refresh cookie
                
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
                                        currentUser, setCurrentUser, isCreditBoxOpen, setCreditBoxOpen, getUser}}>
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
                 <Route path="/profile" element={<Profile/>}/>
                <Route path="/UserLandingPage" element = {
                    <ProtectedRoute> <UserLandingPage/>  </ProtectedRoute> } />

                <Route path="/form" element={
                    <ProtectedRoute> <FormPage/> </ProtectedRoute> }/>

                <Route path="/waitingpage" element=
                { <ProtectedRoute><InterviewWaitingPage/> </ProtectedRoute>}/>

                <Route path="/interviewpage" element={
                   <ProtectedRoute>  <InterviewPage/> </ProtectedRoute>}/>

                <Route path="/interviewdonepage" element={
                     <ProtectedRoute>  <InterviewDonePage/> </ProtectedRoute>}/>


             </Routes>
            </Router>

        </AppProvider>

    )

   }

export default App
export { AppContext };




