import axios from "axios";


const BASE_URL = "http://127.0.0.1:8000";



export const sendMessage = async (

    message,

    history = [],

    patientContext = {}

) => {


    const response = await axios.post(

        `${BASE_URL}/chat`,

        {

            message,

            history,

            patient_context: patientContext

        }

    );


    return response.data;

};





// ===============================
// Skin Image Prediction
// ===============================


export const predictSkinImage = async (file)=>{


    const formData = new FormData();


    formData.append(
        "file",
        file
    );



    const response = await axios.post(

        `${BASE_URL}/predict-image`,

        formData,

        {

            headers:{

                "Content-Type":
                "multipart/form-data"

            }

        }

    );



    return response.data;


};