import { 
    useEffect, 
    useState 
} from "react";


import { 
    useAuth 
} from "../context/AuthContext";


import {
    getConversations,
    deleteConversation
} from "../services/conversationService";



export function useConversations(){


    const { user } = useAuth();



    const [
        conversations,
        setConversations
    ] = useState([]);



    const [
        loading,
        setLoading
    ] = useState(true);





    const loadConversations = async()=>{


        if(!user){

            setConversations([]);

            setLoading(false);

            return;

        }



        try{


            const data = await getConversations(
                user.uid
            );


            setConversations(data);


        }

        catch(error){


            console.error(
                "Loading conversations failed:",
                error
            );


        }


        setLoading(false);

    };







    // Delete chat

    const removeConversation = async(id)=>{


        if(!user) return;



        try{


            await deleteConversation(

                user.uid,

                id

            );



            // remove from UI immediately

            setConversations(prev =>

                prev.filter(
                    chat => chat.id !== id
                )

            );


        }

        catch(error){


            console.error(
                "Delete conversation failed:",
                error
            );


        }


    };








    useEffect(()=>{


        loadConversations();


    },[user]);







    return {


        conversations,


        loading,


        loadConversations,


        removeConversation


    };


}