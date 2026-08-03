import {
    collection,
    addDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDocs,
    orderBy,
    query,
    deleteDoc
} from "firebase/firestore";


import { db } from "../firebase/firebase";





const EMPTY_CONTEXT = {

    duration:"",
    severity:"",
    medicine:"",
    medical_history:"",
    trigger:"",
    other_notes:""

};






// Create conversation

export async function createConversation(
    uid,
    title
){


    const conversationRef = await addDoc(


        collection(

            db,

            "users",

            uid,

            "conversations"

        ),


        {


            title,


            summary:"",


            lastSymptoms:[],


            patientContext:EMPTY_CONTEXT,



            createdAt:
                serverTimestamp(),



            updatedAt:
                serverTimestamp()


        }


    );



    return conversationRef.id;


}








// Update conversation timestamp + patient memory

export async function updateConversation(

    conversationId,

    uid,

    extraData={}

){


    await updateDoc(


        doc(

            db,

            "users",

            uid,

            "conversations",

            conversationId

        ),


        {


            ...extraData,


            updatedAt:serverTimestamp()


        }


    );


}


// Get conversations

export async function getConversations(uid){


    if(!uid)
        return [];



    const q=query(


        collection(

            db,

            "users",

            uid,

            "conversations"

        ),


        orderBy(

            "updatedAt",

            "desc"

        )


    );



    const snapshot =
        await getDocs(q);




    return snapshot.docs.map(doc=>({


        id:doc.id,


        title:
            doc.data().title || "New Consultation",



        summary:
            doc.data().summary || "",



        patientContext:
            doc.data().patientContext || EMPTY_CONTEXT,



        lastSymptoms:
            doc.data().lastSymptoms || [],



        ...doc.data()


    }));


}









// Delete conversation

export async function deleteConversation(

    uid,

    conversationId

){


    const messagesRef = collection(


        db,


        "users",


        uid,


        "conversations",


        conversationId,


        "messages"


    );



    const messagesSnapshot =
        await getDocs(messagesRef);




    for(
        const message of messagesSnapshot.docs
    ){

        await deleteDoc(
            message.ref
        );

    }





    await deleteDoc(


        doc(

            db,

            "users",

            uid,

            "conversations",

            conversationId

        )


    );


}









// Delete all conversations

export async function deleteAllConversations(uid){


    const snapshot =
        await getDocs(


            collection(

                db,

                "users",

                uid,

                "conversations"

            )


        );




    for(
        const conversation of snapshot.docs
    ){


        await deleteConversation(

            uid,

            conversation.id

        );


    }


}