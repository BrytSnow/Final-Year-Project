import { initializeApp } from "firebase/app";

import { 
    getAuth 
} from "firebase/auth";

import {
    getFirestore
} from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyBXHgdp762LTy4vn2ocd5ZZT5ZyaKRREeg",

    authDomain: "ai-disease-detection-sys-8e3d4.firebaseapp.com",

    projectId: "ai-disease-detection-sys-8e3d4",

    storageBucket: "ai-disease-detection-sys-8e3d4.firebasestorage.app",

    messagingSenderId: "171590356518",

    appId: "1:171590356518:web:0ffccfff999cef4fbea0e7"

};



const app = initializeApp(firebaseConfig);



export const auth = getAuth(app);

export const db = getFirestore(app);