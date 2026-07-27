import React from "react";
import "./FAQItem.css";
import { useState } from "react";


const FAQItem = ({question, answer}) => {
    const [isOpen, setisOpen] = useState(false);

    return (
        <>
        <div id="faq-item" onClick={() => setisOpen(!isOpen)}>

            <p id ="faq-question">
                {question}
            </p>

            <p className={`faq-answer ${isOpen ? 'open': ''}`}>{answer}</p>

        </div>
        </>
    )
}

export default FAQItem

