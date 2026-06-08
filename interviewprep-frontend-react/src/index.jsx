import React from "react"
import ReactDOM from "react-dom/client"
import App from "./components/App"
import './styles/global.css'

const react_root = document.getElementById("root")


ReactDOM.createRoot(react_root).render(<App />)
// render string into react_root (which is div)