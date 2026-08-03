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
                                Tell me what you're experiencing and
                                I'll help you understand possible causes,
                                symptoms, and general health information.
                            </p>


                            <div className="example-box">

                                Try asking:

                                <strong>
                                    "I have fever, headache and body pain for three days."
                                </strong>

                            </div>

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