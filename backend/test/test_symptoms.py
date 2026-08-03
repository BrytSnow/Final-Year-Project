from nlp.symptom_extractor import extract_symptoms


text = """
I have fever, chills, headache,
body weakness and muscle pain
"""


result = extract_symptoms(text)


print(result)