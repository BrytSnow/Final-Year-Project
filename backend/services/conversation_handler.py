from services.groq_service import generate_medical_response


def handle_conversation(
    message,
    history=None,
    patient_context=None
):

    if history is None:
        history = []

    if patient_context is None:
        patient_context = {}


    previous_chat = ""


    for item in history[-6:]:

        previous_chat += (
            f"{item.get('role','user')}: "
            f"{item.get('content','')}\n"
        )



    prompt = f"""
You are a friendly AI health assistant.

Your role is general conversation only.

You are NOT performing diagnosis here.

Handle:

- greetings
- thanks
- goodbye messages
- casual conversation
- general questions


Conversation history:

{previous_chat}


Current user message:

{message}



Rules:

1. Be friendly and natural.

2. If the user only greets you:
   greet them and ask how you can help.

Example:

User:
hi

Assistant:
Hello! 👋 I'm here to help with your health concerns. How can I assist you today?


3. If the user says thanks:
   respond politely.

Example:

User:
thanks

Assistant:
You're welcome! Feel free to ask if you have any health concerns.


4. If the user asks a non-medical question:
   answer briefly but remind them you specialize in health assistance when appropriate.


5. Do not ask medical assessment questions unless the user mentions symptoms.


Return only the assistant response text.

"""


    response = generate_medical_response(
        prompt=prompt,
        intent="conversation"
    )


    if isinstance(response, dict):

        return response.get(
            "response",
            "Hello! How can I assist you today?"
        )


    return response