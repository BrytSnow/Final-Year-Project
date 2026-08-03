import {
    collection,
    addDoc,
    getDocs,
    serverTimestamp,
    orderBy,
    query
} from "firebase/firestore";

import {db} from "../firebase/firebase";




// Save message

export async function saveMessage(
    uid,
    conversationId,
    message
){

    if(!uid || !conversationId || !message)
        return;


    await addDoc(

        collection(
            db,
            "users",
            uid,
            "conversations",
            conversationId,
            "messages"
        ),

        {

            ...message,

            createdAt:serverTimestamp()

        }

    );

}





// Load messages

export async function getMessages(
    uid,
    conversationId
){

    if(!uid || !conversationId)
        return [];



    const q=query(

        collection(
            db,
            "users",
            uid,
            "conversations",
            conversationId,
            "messages"
        ),

        orderBy(
            "createdAt",
            "asc"
        )

    );



    const snapshot = await getDocs(q);



    return snapshot.docs.map(doc=>{


        const data = doc.data();



        return {


            id:doc.id,


            type:data.type || "ai",



            text:
                data.text || "",



            data:
            data.data || {



                response:"",


                symptoms_detected:[],


                possible_diseases:[],


                requires_more_info:false,


                questions:[],


                patient_context:{}


            },



            createdAt:
                data.createdAt || null

        };


    });

}