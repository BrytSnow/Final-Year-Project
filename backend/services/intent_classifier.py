import os
import json

from dotenv import load_dotenv
from groq import Groq


load_dotenv()


client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)



def classify_intent(message: str):

    prompt = f"""
You are an AI intent classification system for a medical assistant.

Your job is to classify the user's message into EXACTLY ONE intent.

Available intents:


conversation

Use this when the user is:
- greeting
- saying hello
- thanking
- saying goodbye
- making small talk
- asking general non-medical questions

Examples:

"hi"
"hello"
"good morning"
"how are you?"
"thanks"
"bye"
"who are you?"
"what can you do?"


symptom_check

Use this when the user:
- describes symptoms
- says they are sick
- reports pain or discomfort
- asks what condition they might have

Examples:

"I have fever"
"I have headache and body pain"
"My stomach hurts"
"I feel dizzy"
"I am vomiting"


disease_information

Use this when the user asks about a specific disease.

Examples:

"What is malaria?"
"Tell me about diabetes"
"Symptoms of tuberculosis"


medicine_information

Use this when the user asks about medicine, drugs, or treatment.

Examples:

"What medicine treats malaria?"
"Can I take paracetamol?"
"What are the side effects of antibiotics?"


prevention

Use this when the user asks how to avoid disease.

Examples:

"How can I prevent malaria?"
"How do I stay healthy?"


emergency

Use this when the user describes urgent danger.

Examples:

"Severe chest pain"
"I cannot breathe"
"Heavy bleeding"
"I fainted"
"Signs of stroke"


Return ONLY JSON.

Correct format:

{{
    "intent":"conversation"
}}


User message:

{message}

"""


    try:

        response = client.chat.completions.create(

            model="llama-3.1-8b-instant",

            messages=[

                {
                    "role":"system",
                    "content":
                    "You classify user intent. Return JSON only."
                },

                {
                    "role":"user",
                    "content":prompt
                }

            ],

            temperature=0,

            response_format={
                "type":"json_object"
            }

        )


        result = json.loads(

            response
            .choices[0]
            .message
            .content

        )


        intent = result.get(
            "intent",
            "conversation"
        )


        allowed_intents = [

            "conversation",
            "symptom_check",
            "disease_information",
            "medicine_information",
            "prevention",
            "emergency"

        ]


        if intent not in allowed_intents:

            return "conversation"


        return intent



    except Exception as e:

        print(
            "Intent classification error:",
            e
        )

        return "conversation"