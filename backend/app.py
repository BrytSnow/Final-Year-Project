from typing import Dict, List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


from nlp.symptom_extractor import extract_symptoms

from services.intent_classifier import classify_intent
from services.disease_search import search_disease
from services.groq_service import generate_medical_response
from services.conversation_handler import handle_conversation

from llm.medical_conversation import handle_medical_conversation



app = FastAPI(
    title="AI Disease Detection System API",
    version="1.0.0"
)



app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)



# ==============================
# Models
# ==============================


class ChatRequest(BaseModel):

    message: str

    history: List[Dict] = Field(
        default_factory=list
    )

    patient_context: Dict = Field(
        default_factory=dict
    )




class Assessment(BaseModel):

    possible_conditions: List[Dict] = Field(
        default_factory=list
    )

    explanation: str = ""

    recommended_steps: List[str] = Field(
        default_factory=list
    )

    warning_signs: List[str] = Field(
        default_factory=list
    )




class ChatResponse(BaseModel):

    response: str

    symptoms_detected: List[str]

    possible_diseases: List[str]

    assessment: Assessment = Field(
        default_factory=Assessment
    )

    requires_more_info: bool

    questions: List[str] = Field(
        default_factory=list
    )

    patient_context: Dict = Field(
        default_factory=dict
    )




@app.get("/")
def health_check():

    return {
        "status": "API is running"
    }




# ==============================
# Processing
# ==============================


def process_message(
    user_message,
    history,
    patient_context
):


    intent = classify_intent(
        user_message
    )


    print(
        "Detected Intent:",
        intent
    )



    symptoms = []

    disease_information = []




    # --------------------------
    # General conversation
    # --------------------------

    if intent == "conversation":


        response = handle_conversation(
            message=user_message
        )


        return {

            "response": response,

            "symptoms_detected": [],

            "possible_diseases": [],

            "assessment": {},

            "requires_more_info": False,

            "questions": [],

            "patient_context": patient_context

        }





    # --------------------------
    # Symptom consultation
    # --------------------------


    if intent == "symptom_check":


        symptoms = extract_symptoms(
            user_message
        )


        disease_information = search_disease(
            user_message,
            top_k=5
        )



        result = handle_medical_conversation(

            message=user_message,

            history=history,

            symptoms=symptoms,

            diseases=disease_information,

            patient_context=patient_context

        )



        return {

            "response":
                result.get(
                    "response",
                    ""
                ),


            "symptoms_detected":
                symptoms,


            "possible_diseases":
                [
                    d["disease"]
                    for d in disease_information
                ],


            "assessment":
                result.get(
                    "assessment",
                    {}
                ),


            "requires_more_info":
                result.get(
                    "requires_more_info",
                    False
                ),


            "questions":
                result.get(
                    "questions",
                    []
                ),


            "patient_context":
                result.get(
                    "patient_context",
                    patient_context
                )

        }





    # --------------------------
    # Disease information
    # --------------------------


    if intent == "disease_information":


        disease_information = search_disease(

            user_message,

            top_k=5

        )





    # --------------------------
    # Other medical requests
    # --------------------------


    response = generate_medical_response(

        user_message=user_message,

        intent=intent,

        symptoms=symptoms,

        disease_info=disease_information,

        history=history

    )



    if isinstance(response, dict):

        response_text = response.get(
            "response",
            ""
        )

    else:

        response_text = response




    return {

        "response": response_text,


        "symptoms_detected": symptoms,


        "possible_diseases":
            [
                d["disease"]
                for d in disease_information
            ],


        "assessment": {},


        "requires_more_info": False,


        "questions": [],


        "patient_context": patient_context

    }






@app.post(
    "/chat",
    response_model=ChatResponse
)
def chat(
    data: ChatRequest
):

    try:


        return process_message(

            data.message,

            data.history,

            data.patient_context

        )


    except Exception as e:


        import traceback


        print(
            "CHAT ERROR:"
        )


        traceback.print_exc()



        raise HTTPException(

            status_code=500,

            detail=str(e)

        )