import os
import pandas as pd
import re


BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)


DATASET_PATH = os.path.join(
    BASE_DIR,
    "datasets",
    "disease_dataset.csv"
)



print("Loading symptom knowledge...")

df = pd.read_csv(
    DATASET_PATH
)


df = df.fillna("")



# -----------------------------------
# Build symptom dictionary
# -----------------------------------

SYMPTOMS = set()


for symptoms in df["Common Symptoms"]:

    symptoms = symptoms.lower()

    # Split symptoms by comma
    parts = symptoms.split(",")

    for item in parts:

        clean = item.strip()

        if len(clean) > 2:

            SYMPTOMS.add(clean)



# Sort longest first
# Important:
# "body weakness" should match before "body"

SYMPTOMS = sorted(
    SYMPTOMS,
    key=len,
    reverse=True
)



print(
    f"Loaded {len(SYMPTOMS)} symptoms"
)



# -----------------------------------
# Extract symptoms
# -----------------------------------

def extract_symptoms(text):

    text = text.lower()


    detected = []


    for symptom in SYMPTOMS:

        pattern = r"\b" + re.escape(symptom) + r"\b"


        if re.search(
            pattern,
            text
        ):

            detected.append(symptom)



    # -----------------------------------
    # Remove duplicate shorter symptoms
    # -----------------------------------

    filtered = []


    for symptom in detected:

        is_duplicate = False


        for other in detected:

            if (
                symptom != other
                and symptom in other
            ):

                is_duplicate = True

                break


        if not is_duplicate:

            filtered.append(symptom)



    return filtered