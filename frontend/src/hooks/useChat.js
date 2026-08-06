import {useState} from "react";

import {
    sendMessage,
    predictSkinImage
} from "../api/api";

import {useAuth} from "../context/AuthContext";
import {useConversation} from "../context/ConversationContext";

import {
    createConversation,
    updateConversation
} from "../services/conversationService";

import {saveMessage} from "../services/messageService";



export function useChat(){


    const {user}=useAuth();



    const {

        currentConversation,

        setCurrentConversation,


        chatMessages,

        setChatMessages,


        patientContext,

        updatePatientContext


    }=useConversation();





    const [input,setInput]=useState("");

    const [selectedImage,setSelectedImage]=useState(null);

    const [loading,setLoading]=useState(false);






    const handleSend=async()=>{


        if(
            (!input.trim() && !selectedImage)
            ||
            loading
        )

        return;


        const imageToSend = selectedImage;

        const userInput=input.trim();


        let conversationId=currentConversation;





        try{



            // Create new conversation

            if(!conversationId && user){



                const title =

                    userInput.length > 40

                    ? userInput.substring(0,40)+"..."

                    : userInput;




                conversationId =

                    await createConversation(

                        user.uid,

                        title

                    );




                setCurrentConversation(

                    conversationId

                );

            }







            const userMessage={


                type:"user",


                text:userInput


            };







            const updatedMessages=[


                ...chatMessages,


                userMessage


            ];




            setChatMessages(

                updatedMessages

            );







            if(user && conversationId){


                await saveMessage(

                    user.uid,

                    conversationId,

                    userMessage

                );


            }







            setInput("");

            setSelectedImage(null);

            setLoading(true);







            // Prepare conversation history

            const history =

                updatedMessages

                .slice(-10)

                .map(message=>{





                    if(message.type==="user"){


                        return {


                            role:"user",


                            content:message.text


                        };


                    }






                    return {


                        role:"assistant",



                        content:`


                    ${message.data?.response || ""}



                    Follow-up questions:

                    ${
                    message.data?.questions?.join("\n")
                    || "None"
                    }




                    Patient context:

                    ${
                    JSON.stringify(

                    message.data?.patient_context || {},

                    null,

                    2

                    )

                    }



`

                    };



                });






            let response;



            if(imageToSend){


                response = await predictSkinImage(
                    imageToSend
                );


            }
            else{


                response = await sendMessage(

                    userInput,

                    history,

                    patientContext

                );


            }

            // Update shared patient memory

            if(response.patient_context){



                updatePatientContext(

                    response.patient_context

                );


            }









            const aiMessage={



                type:"ai",



                data:{





                    response:

                        response.response || "",





                    symptoms_detected:

                        response.symptoms_detected || [],





                    possible_diseases:

                        response.possible_diseases || [],





                    requires_more_info:

                        response.requires_more_info || false,





                    questions:

                        response.questions || [],





                    patient_context:

                        response.patient_context || patientContext





                }



            };









            setChatMessages(prev=>[


                ...prev,


                aiMessage


            ]);









            if(user && conversationId){



                await saveMessage(


                    user.uid,


                    conversationId,


                    aiMessage


                );





    await updateConversation(

        conversationId,

        user.uid,

        {

            patientContext:

                response.patient_context || patientContext,


            symptoms:

                response.symptoms_detected || [],


            summary:

                response.response

                ? response.response.substring(0,150)

                : ""

        }

    );



            }






        }

        catch(error){



            console.error(

                "Chat Error:",

                error

            );






            const errorMessage={



                type:"ai",



                data:{



                    response:

                    "Sorry, I cannot connect to the medical assistant right now. Please try again.",




                    symptoms_detected:[],




                    possible_diseases:[],




                    requires_more_info:false,




                    questions:[],




                    patient_context:patientContext



                }


            };







            setChatMessages(prev=>[


                ...prev,


                errorMessage


            ]);



        }

        finally{


            setLoading(false);


        }


    };







    return{


        messages:chatMessages,

        input,

        setInput,

        loading,

        handleSend,

        patientContext,

        selectedImage,

        setSelectedImage

    };


}