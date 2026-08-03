import os
import json

from dotenv import load_dotenv
from groq import Groq


load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_medical_response(
    user_message=None,
    intent=None,
    symptoms=None,
    disease_info=None,
    history=None,
    prompt=None
):

    symptoms = symptoms or []
    disease_info = disease_info or []
    history = history or []


    if prompt is None:

        conversation = ""

        for message in history[-5:]:

            conversation += (
                f"{message.get('role','user')}: "
                f"{message.get('content','')}\n"
            )


        medical_context = ""

        for disease in disease_info:

            medical_context += (
                f"Disease: {disease.get('disease')}\n"
                f"Symptoms: {disease.get('symptoms')}\n"
                f"Treatment: {disease.get('treatment')}\n"
                f"Herbal Information: {disease.get('herbal')}\n"
                f"Notes: {disease.get('notes')}\n\n"
            )


        prompt = f"""
You are an AI Health Assistant.

The user intent is:

{intent}


If the intent is conversation:

- Act like a friendly assistant.
- Answer greetings naturally.
- Answer small talk politely.
- Do not ask medical questions.
- Do not mention symptoms or diagnosis.


If the intent is medical:

- Act as a careful health consultation assistant.
- Collect information before assessment.
- Never claim certainty.

Your goal is to understand the patient's condition by collecting important information before giving a possible assessment.

Patient conversation:
{conversation}

Current patient message:
{user_message}

Detected symptoms:
{symptoms}

Medical information:
{medical_context}


Analyze the situation carefully.


If important information is missing:

Return:

{{
    "response": "Short and friendly follow-up questions for the patient.",
    "requires_more_info": true,
    "questions": [
        "Question 1",
        "Question 2"
    ]
}}


Follow-up question rules:

- Ask only questions that are useful for this specific patient.
- Questions must depend on symptoms and situation.
- Do not ask the same questions for every patient.
- Ask between 2 and 5 questions maximum.
- Keep questions short and simple.


Examples:

Fever:
- How long have you had the fever?
- Did it start suddenly or gradually?
- Have you taken any medication?


Accident:
- How did the accident happen?
- Which part of your body was affected?
- Are you experiencing bleeding or severe pain?


Stomach problems:
- What did you eat before symptoms started?
- Are you vomiting or having diarrhea?


If enough information is available:

Return:

{{
    "response": "Possible conditions, explanation, recommended actions, treatment information and warning signs.",
    "requires_more_info": false,
    "questions": []
}}


Important rules:

- Never claim certainty.
- Do not replace a real healthcare professional.
- Recommend medical attention for serious symptoms.
- Keep responses clear and concise.
"""


    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role":"system",
                "content":
                """
You are a careful and professional AI Health Assistant.

Always return valid JSON.

The JSON must contain:

- response
- requires_more_info
- questions

Never include markdown outside JSON.
"""
            },
            {
                "role":"user",
                "content":prompt
            }
        ],
        temperature=0.3,
        max_tokens=700,
        response_format={
            "type":"json_object"
        }
    )


    text = response.choices[0].message.content.strip()


    try:

        return json.loads(text)


    except json.JSONDecodeError:

        return {
            "response":text,
            "requires_more_info":False,
            "questions":[]
        }