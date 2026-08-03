from nlp.symptom_extractor import extract_symptoms

text = "I have fever, headache and feel very fatigued"
symptoms = extract_symptoms(text)
print("Extracted Symptoms:", symptoms)