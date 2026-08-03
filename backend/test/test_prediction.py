import joblib
import numpy as np
import pandas as pd


MODEL_PATH = "models/disease_model.pkl"
SYMPTOMS_PATH = "models/symptoms_list.pkl"


model = joblib.load(MODEL_PATH)
symptoms = joblib.load(SYMPTOMS_PATH)


def predict(user_symptoms):

    input_data = pd.DataFrame(
    np.zeros((1, len(symptoms))),
    columns=symptoms
)


    for symptom in user_symptoms:

        if symptom in symptoms:

            index = symptoms.index(symptom)
            input_data.loc[0, symptom] = 1


    prediction = model.predict(
        [input_data]
    )


    probability = model.predict_proba(
        [input_data]
    )


    confidence = max(probability[0])


    print("Disease:", prediction[0])
    print("Confidence:", confidence)



# Test cases

import pandas as pd
import numpy as np
import joblib


MODEL_PATH = "models/disease_model.pkl"
SYMPTOMS_PATH = "models/symptoms_list.pkl"


model = joblib.load(MODEL_PATH)
symptoms = joblib.load(SYMPTOMS_PATH)


def predict(user_symptoms):

    # Create dataframe with correct feature names
    input_data = pd.DataFrame(
        np.zeros((1, len(symptoms))),
        columns=symptoms
    )


    # Activate symptoms
    for symptom in user_symptoms:

        if symptom in symptoms:
            input_data.loc[0, symptom] = 1


    prediction = model.predict(
        input_data
    )


    probability = model.predict_proba(
        input_data
    )


    confidence = max(probability[0])


    print("Disease:", prediction[0])
    print("Confidence:", confidence)



# Test 1
predict([
    "fever",
    "chills",
    "headache",
    "body ache"
])


# Test 2
predict([
    "cough",
    "difficulty breathing",
    "chest tightness"
])