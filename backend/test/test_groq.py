from llm.llm_service import generate_response


response = generate_response(
    "Malaria",
    "fever, headache, chills",
    "ACT medication",
    "Neem leaf preparation",
    "Sleep under mosquito nets"
)


print(response)