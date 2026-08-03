from groq import Groq
import os
from dotenv import load_dotenv


load_dotenv()


client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)



def generate_response(
    disease,
    symptoms,
    orthodox,
    herbal,
    prevention
):

    prompt = f"""

You are an AI health assistant.

The user provided these symptoms:

{symptoms}


The predicted disease is:

{disease}


Information from medical database:

Orthodox treatment:
{orthodox}


Traditional/herbal information:
{herbal}


Prevention:
{prevention}



Generate a clear response containing:

1. Possible disease explanation
2. Why the symptoms match
3. Treatment information
4. Prevention advice
5. A medical disclaimer


Important:
- Do not claim certainty.
- Do not replace a doctor.
- Encourage professional medical consultation.


"""


    response = client.chat.completions.create(

        model="llama-3.1-8b-instant",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],

        temperature=0.3

    )


    return response.choices[0].message.content