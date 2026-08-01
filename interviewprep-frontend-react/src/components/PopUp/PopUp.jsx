import React, {useEffect} from "react";
import "./PopUp.css";


const PopUp = ({showPopUp, setshowPopUp, message, id}) => {

    useEffect(() => {
        if (!showPopUp) return;
        const timer = setTimeout(() => {setshowPopUp(false)}, 4500)
        return () => clearTimeout(timer);
    }, [showPopUp])
   

    return (
        <>

        {showPopUp && 

            <div id="pop-up-wrapper">

            <p id= {id} className="pop-up"> {message} </p>

            </div>
        }

        </>
        
    )
}

export default PopUp 