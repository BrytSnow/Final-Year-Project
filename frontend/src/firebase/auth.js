import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
    deleteUser,
    GoogleAuthProvider,
    signInWithPopup,
    sendEmailVerification
} from "firebase/auth";

import {auth} from "./firebase";

import {
    
    sendPasswordResetEmail
} from "firebase/auth";

const firebaseError=(error)=>{

    switch(error.code){

        case "auth/email-already-in-use":
            return "This email is already registered.";

        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/weak-password":
            return "Password should contain at least 6 characters.";

        case "auth/invalid-credential":
            return "Incorrect email or password.";

        case "auth/user-not-found":
            return "No account found with this email.";

        case "auth/wrong-password":
            return "Incorrect password.";

        case "auth/requires-recent-login":
            return "Please login again before performing this action.";

        default:
            return "Something went wrong. Please try again.";

    }

};



export const registerUser=async(
    email,
    password,
    displayName
)=>{

    try{

        const result=
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );


        await updateProfile(
            result.user,
            {
                displayName,
                photoURL:null
            }
        );


        await sendEmailVerification(
            result.user
        );


        await result.user.reload();


        return result.user;


    }catch(error){

        throw new Error(
            firebaseError(error)
        );

    }

};



export const loginUser=async(
    email,
    password
)=>{

    try{

        const result=
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user=result.user;


        await user.reload();


        if(!user.emailVerified){

            await signOut(auth);

            throw new Error(
                "Please verify your email before logging in."
            );

        }


        return user;


    }catch(error){

        if(error.message.includes("Please verify")){

            throw error;

        }


        throw new Error(
            firebaseError(error)
        );

    }

};



export const loginWithGoogle=async()=>{

    try{

        const provider=
            new GoogleAuthProvider();


        const result=
            await signInWithPopup(
                auth,
                provider
            );


        return result.user;


    }catch(error){

        throw new Error(
            firebaseError(error)
        );

    }

};

export const forgotPassword = async(email)=>{

    try{

        await sendPasswordResetEmail(
            auth,
            email
        );

    }catch(error){

        throw new Error(
            firebaseError(error)
        );

    }

};


export async function updateUserProfile(
    user,
    data
){

    try{

        await updateProfile(
            user,
            {
                displayName:data.displayName,
                photoURL:data.photoURL
            }
        );


        await user.reload();


    }catch(error){

        throw new Error(
            firebaseError(error)
        );

    }

};



export async function changeUserPassword(
    user,
    currentPassword,
    newPassword
){

    try{

        const credential=
            EmailAuthProvider.credential(
                user.email,
                currentPassword
            );


        await reauthenticateWithCredential(
            user,
            credential
        );


        await updatePassword(
            user,
            newPassword
        );


    }catch(error){

        throw new Error(
            firebaseError(error)
        );

    }

};



export async function deleteAccount(user){

    try{

        await deleteUser(user);

    }catch(error){

        throw new Error(
            firebaseError(error)
        );

    }

};



export const logoutUser=async()=>{

    await signOut(auth);

};