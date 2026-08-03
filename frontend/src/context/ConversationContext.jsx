import {
    createContext,
    useContext,
    useState
} from "react";



const ConversationContext = createContext();





const getEmptyPatientContext = () => ({

    duration:"",

    severity:"",

    medicine:"",

    medical_history:"",

    trigger:"",

    other_notes:""

});







export function ConversationProvider({children}){


    const [
        currentConversation,
        setCurrentConversation
    ] = useState(null);




    const [
        chatMessages,
        setChatMessages
    ] = useState([]);




    const [
        patientContext,
        setPatientContext
    ] = useState(
        getEmptyPatientContext()
    );








    const addMessage = (message)=>{


        setChatMessages(prev=>[

            ...prev,

            message

        ]);


    };








    const clearMessages = ()=>{


        setChatMessages([]);


    };









    // Update only specific patient information

    const updatePatientContext = (newContext)=>{


        setPatientContext(prev=>(

            {

                ...prev,

                ...newContext

            }

        ));


    };









    const clearPatientContext = ()=>{


        setPatientContext(

            getEmptyPatientContext()

        );


    };









    const startNewChat = ()=>{


        setCurrentConversation(null);


        clearMessages();


        clearPatientContext();


    };









    // Restore old conversation

    const loadConversation = (

        messages,

        context={}

    )=>{


        setChatMessages(


            messages.map(message=>(


                {

                    ...message,


                    data:

                        message.data || null


                }


            ))


        );





        setPatientContext(


            {

                ...getEmptyPatientContext(),


                ...context


            }


        );


    };









    return(


        <ConversationContext.Provider


            value={{



                currentConversation,


                setCurrentConversation,





                chatMessages,


                setChatMessages,





                addMessage,





                clearMessages,





                loadConversation,





                startNewChat,





                patientContext,





                setPatientContext,





                updatePatientContext,





                clearPatientContext



            }}


        >


            {children}


        </ConversationContext.Provider>


    );


}









export function useConversation(){


    return useContext(

        ConversationContext

    );


}