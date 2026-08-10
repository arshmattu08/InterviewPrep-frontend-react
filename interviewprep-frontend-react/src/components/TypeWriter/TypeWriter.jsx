import React, {useState, useEffect} from "react";
import "./TypeWriter.css";

const TypeWriter = ({statementArray, id = ""}) =>{

    const [index, setIndex] = useState(0)
    const [phase, setPhase] = useState("typing")
    const [text, setText] = useState("")


    useEffect(() => {
        const current = statementArray[index];
        const speed = phase === "typing" ? 50 : 25;

        const timer = setTimeout(()=> {

            if (phase == "typing") {
                if(text.length < current.length) {
                    setText(current.slice(0, text.length +1 )) //add one char at a time. we're growing our text one by one using current stmt
                }
                else {
                    setTimeout(()=> setPhase('deleting'), 2000)
                }
            }

            else {
                if (text.length > 0) {
                    setText(text.slice(0,-1))
                }
                else {
                    setTimeout(() => setPhase("typing"), 900)
                    setIndex((i) => (i + 1) % statementArray.length);
                }
            }

            }, speed)

            return () => clearTimeout(timer)

    },[text, phase])

    return (
        <>
        <div id= {id}>
            <span>{text}</span> <span className="cursor">|</span>
        </div>
        </>
    )
}

export default TypeWriter