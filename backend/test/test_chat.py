import requests


url = "http://127.0.0.1:8000/chat"


tests = [

    "Hello",

    "Thank you",

    "What is malaria?",

    "I have fever, headache and chills",

    "How can I prevent cholera?",

    "I am having severe chest pain and difficulty breathing"

]


for message in tests:

    response = requests.post(
        url,
        json={
            "message": message,
            "history": []
        }
    )

    print("\n====================")
    print("USER:")
    print(message)

    print("\nAI:")
    print(response.json()["response"])

    print("\nDiseases:")
    print(response.json()["possible_diseases"])