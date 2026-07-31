import React, { useState } from "react";
import "./CreditDialogBox.css";
import { useContext } from "react";
import { AppContext } from "../App";
import Logo from "../../assets/logo1.svg";
import {Minus, Plus} from "lucide-react";
import Button from "../Button/Button";



const CreditDialogBox = () => {

    const {setCreditBoxOpen} = useContext(AppContext)
    const [quantity, setQuantity] = useState(1)
    const [selectedPlan, setSelectedPlan] = useState("")

    const onClose = () =>{
        setCreditBoxOpen(false)
    }

    const increment = () => {
        setQuantity(quantity + 1)
        
    }

    const decrement = () => {
        if (quantity > 1)  setQuantity(quantity -1 )
    }

   



    return (
        <>
        <div id="add-credits-wrapper" onClick={onClose}>

            <div id="credit-dialog-box" onClick={(e)=> e.stopPropagation()}>
               {/* <img id="box-logo" src= {Logo}></img> */}

               <h2>FYI</h2>

               <div className={selectedPlan == "payg" ? "plans selected": "plans"} onClick={() => setSelectedPlan("payg")}>
                    <h4>Pay As You Go</h4>
                    <p>10 Credits</p>
                     <h4>$2.99</h4>
               </div>

                <div className={selectedPlan == "bundle" ? "plans selected": "plans"}onClick={() => setSelectedPlan("bundle")}>
                    <h4>Bundle</h4>
                     <p>50 Credits</p>
                    <h4>$11.99</h4>
               </div>

               <div id="quantity">
                     <h3>Quantity</h3>
                     <button onClick={decrement} className="quantity-btn">  <Minus size={16}/> </button>
                     <span className="quantity-val">{quantity}</span>
                     <button onClick={increment}  className="quantity-btn">  <Plus size={16}/> </button>
               </div>

               <Button id="pay-btn" label={"Pay Now"}/>

            </div>

        </div>

        </>
    )
}

export default CreditDialogBox
