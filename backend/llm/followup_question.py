import json


def generate_followup_question(llm, symptoms, conversation_history):
    """
    Generates dynamic medical follow-up questions
    based on patient information.
    """

    prompt = f"""
You are an AI medical assistant conducting a patient consultation.

Your goal is to collect enough information before suggesting possible diseases.

Patient symptoms:
{symptoms}

Previous conversation:
{conversation_history}


Generate ONE short follow-up question.

The question should:
- Be relevant to the patient's symptoms
- Ask for missing medical information
- Avoid repeating previous questions
- Sound like a doctor speaking to a patient
- Be easy for a normal person to answer


Examples of useful information:
- Duration of symptoms
- When symptoms started
- Severity
- Possible causes
- Previous medical history
- Medication taken
- Exposure risks
- Accident details if injury is mentioned


Return ONLY the question.
"""

    response = llm.generate(prompt)

    question = response.strip()

    return question