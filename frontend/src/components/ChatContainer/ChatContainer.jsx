import { useEffect,useRef } from "react";

import "./ChatContainer.css";

import { useChat } from "../../hooks/useChat";

import Message from "../Message/Message";
import InputBox from "../InputBox/InputBox";
import TypingIndicator from "../TypingIndicator/TypingIndicator";
import AIResponseCard from "../AIResponseCard/AIResponseCard";


export default function ChatContainer(){

    const {
        messages,
        loading,
        input,
        setInput,
        handleSend
    } = useChat();


    const messagesEndRef=useRef(null);


    useEffect(()=>{

        messagesEndRef.current?.scrollIntoView({
            behavior:"smooth"
        });

    },[messages,loading]);



    return(

        <section className="chat-container">

            <div className="messages">

                {
                    messages.length===0 && (

                        <div className="welcome-message">

                            <div className="welcome-icon">
                                🩺
                            </div>

                            <h2>
                                Your Health Assistant is Ready
                            </h2>

                            <p>
                                Your AI-powered health companion. Describe your symptoms in your own words or voice, ask health-related questions, and receive intelligent insights, possible conditions, treatment suggestions, and wellness recommendations. Always consult a qualified healthcare professional for medical emergencies or confirmed diagnoses.
                            </p>

                        </div>

                    )
                }



                {
                    messages.map((message,index)=>(

                        <Message
                            key={index}
                            sender={message.type}
                        >

                            {
                                message.type==="user"

                                ?

                                message.text

                                :

                                <AIResponseCard data={message.data}/>

                            }

                        </Message>

                    ))
                }



                {
                    loading && (

                        <Message sender="ai">

                            <TypingIndicator/>

                        </Message>

                    )
                }

                <div ref={messagesEndRef}/>

            </div>

            <InputBox
                value={input}
                onChange={setInput}
                onSend={handleSend}
                disabled={loading}
            />


        </section>

    );

}