import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy
} from "firebase/firestore";


import {
    db
} from "../firebase/firebase";



export async function savePrediction(data){


    await addDoc(

        collection(
            db,
            "predictions"
        ),

        data

    );


}



export async function getUserHistory(uid){

    const q = query(

        collection(
            db,
            "predictions"
        ),

        where(
            "userId",
            "==",
            uid
        )

    );


    const snapshot = await getDocs(q);


    return snapshot.docs.map(
        doc=>({

            id:doc.id,

            ...doc.data()

        })
    );

}