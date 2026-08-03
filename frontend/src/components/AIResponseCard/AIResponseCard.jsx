import "./AIResponseCard.css";

import ReactMarkdown from "react-markdown";


export default function AIResponseCard({data}){

    if(!data)
        return null;


    const isQuestioning =
        data.requires_more_info === true ||
        data.requires_more_info === "true";


    return(

        <div
            className={
                isQuestioning
                ? "ai-response consultation"
                : "ai-response"
            }
        >

            <div className="ai-response__header">

                {
                    isQuestioning
                    ? "🩺 Let's understand your symptoms"
                    : "🩺 Health Assessment"
                }

            </div>


            <div className="ai-response__content">

                {
                    data.response ?

                    <ReactMarkdown>
                        {
                            data.response.replace(
                                /\n{3,}/g,
                                "\n\n"
                            )
                        }
                    </ReactMarkdown>

                    :

                    <p>
                        No response generated.
                    </p>
                }



                {
                    isQuestioning &&
                    data.questions &&
                    data.questions.length > 0 &&

                    <div className="follow-up-questions">

                        <h4>
                            Please answer these questions:
                        </h4>


                        <ol>

                            {
                                data.questions.map(
                                    (question,index)=>(

                                        <li key={index}>
                                            {question}
                                        </li>

                                    )
                                )
                            }

                        </ol>


                    </div>

                }


            </div>



            {
                !isQuestioning &&

                <div className="ai-response__disclaimer">

                    ⚠️ This information is educational only and does not replace advice from a qualified healthcare professional.

                </div>

            }


        </div>

    );

}