import joblib

model = joblib.load("models/disease_model.pkl")

print("Number of classes:")
print(len(model.classes_))

print("\nClasses:")
for disease in model.classes_:
    print(disease)