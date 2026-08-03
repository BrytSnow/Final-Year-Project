from nlp.disease_matcher import match_disease

query = input("Describe your symptoms:\n\n")

results = match_disease(query)

print()

for result in results:

    print("=" * 60)

    print("Disease:", result["disease"])
    print("Category:", result["category"])
    print("Confidence:", result["confidence"], "%")

    print("\nSymptoms:")
    print(result["symptoms"])

    print("\nOrthodox Treatment:")
    print(result["orthodox"])

    print("\nHerbal Remedies:")
    print(result["herbal"])

    print("\nNotes:")
    print(result["notes"])

    print()