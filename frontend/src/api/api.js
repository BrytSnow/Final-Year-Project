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