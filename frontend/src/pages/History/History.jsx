import "./History.css";

import { useEffect, useState } from "react";

import {
    useAuth
} from "../../context/AuthContext";


import {
    getUserHistory
} from "../../services/historyService";



export default function History() {


    const {
        user
    } = useAuth();



    const [
        history,
        setHistory
    ] = useState([]);



    const [
        loading,
        setLoading
    ] = useState(true);

    useEffect(()=>{

    console.log("History user:", user);

    const loadHistory = async()=>{

        if(!user) return;

        const data = await getUserHistory(user.uid);

        console.log("History data:", data);

        setHistory(data);

        setLoading(false);

    };

    loadHistory();

},[user]);





    useEffect(()=>{


        const loadHistory = async()=>{


            if(!user) return;



            try{


                const data = await getUserHistory(
                    user.uid
                );


                setHistory(data);



            }catch(error){


                console.error(
                    error
                );


            }



            setLoading(false);


        };



        loadHistory();



    },[user]);







    if(loading){


        return (

            <div className="history-page">

                <h2>
                    Loading history...
                </h2>

            </div>

        );


    }







    return (

        <div className="history-page">


            <h1>
                Prediction History
            </h1>




            {
                history.length === 0 ? (


                    <div className="empty-history">


                        <h3>
                            No predictions yet
                        </h3>


                        <p>
                            Your AI disease predictions will appear here.
                        </p>


                    </div>



                ) : (


                    <div className="history-list">


                    {
                        history.map((item)=>(


                            <div 
                                className="history-card"
                                key={item.id}
                            >



                                <h2>

                                    {item.disease}

                                </h2>




                                <div className="confidence">


                                    Confidence:

                                    <strong>

                                        {
                                            Math.round(
                                                item.confidence
                                            )
                                        }%

                                    </strong>


                                </div>




                                <p>


                                    <b>
                                        Symptoms:
                                    </b>


                                    <br/>


                                    {
                                        item.symptoms
                                    }


                                </p>





                                <small>

                                    {
                                        item.createdAt
                                        ?.toDate()
                                        ?.toLocaleString()
                                    }

                                </small>



                            </div>


                        ))

                    }


                    </div>


                )
            }




        </div>


    );


}