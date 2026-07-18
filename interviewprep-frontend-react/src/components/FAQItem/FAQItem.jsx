import React from "react";
import "./FAQItem.css";
import { useState } from "react";


const FAQItem = ({question, answer}) => {
    const [isOpen, setisOpen] = useState(false);

    return (
        <>
        <div id="faq-item">

            <button onClick={() => setisOpen(!isOpen)}>
                {question}
            </button>

            <p className={`faq-answer ${isOpen ? 'open': ''}`}>{answer}</p>

        </div>
        </>
    )
}

export default FAQItem

