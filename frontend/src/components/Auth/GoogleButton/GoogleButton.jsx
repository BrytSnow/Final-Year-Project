import "./GoogleButton.css";

import {FcGoogle} from "react-icons/fc";

import {loginWithGoogle} from "../../../firebase/auth";


export default function GoogleButton(){

    const googleLogin=async()=>{

        try{

            await loginWithGoogle();

            window.location.href="/chat";

        }catch(error){

            console.log(error.message);

        }

    };


    return(

        <button
            className="google-btn"
            onClick={googleLogin}
        >

            <FcGoogle size={22}/>

            Continue with Google

        </button>

    );

}