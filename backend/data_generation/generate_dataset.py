import pandas as pd
import random
import os

from disease_profiles import DISEASE_PROFILES


# Output paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATASET_PATH = os.path.join(
    BASE_DIR,
    "datasets",
    "disease_dataset.csv"
)

SYMPTOMS_PATH = os.path.join(
    BASE_DIR,
    "datasets",
    "symptoms_dataset.csv"
)


# Number of synthetic samples
SAMPLES_PER_DISEASE = 1000


def collect_all_symptoms():

    symptoms = set()

    for disease in DISEASE_PROFILES.values():

        symptoms.update(disease["core"])
        symptoms.update(disease["optional"])

    return sorted(list(symptoms))


def generate_dataset():

    print("Collecting symptoms...")

    all_symptoms = collect_all_symptoms()

    print(f"Total symptoms: {len(all_symptoms)}")


    rows = []


    print("Generating patient records...")


    for disease, profile in DISEASE_PROFILES.items():

        for _ in range(SAMPLES_PER_DISEASE):

            row = {}

            row["disease"] = disease


            # initialize all symptoms as absent
            for symptom in all_symptoms:
                row[symptom] = 0


            # Core symptoms always appear
            for symptom in profile["core"]:

                if symptom in row:
                    row[symptom] = 1


            # Random optional symptoms
            for symptom in profile["optional"]:

                if random.random() > 0.5:

                    if symptom in row:
                        row[symptom] = 1


            rows.append(row)


    df = pd.DataFrame(rows)


    # Shuffle dataset
    df = df.sample(
        frac=1,
        random_state=42
    ).reset_index(drop=True)


    os.makedirs(
        "../datasets",
        exist_ok=True
    )


    df.to_csv(
        DATASET_PATH,
        index=False
    )


    print("\nDataset created:")
    print(df.shape)



    # Save symptom list

    symptom_df = pd.DataFrame(
        {
            "symptom": all_symptoms
        }
    )


    symptom_df.to_csv(
        SYMPTOMS_PATH,
        index=False
    )


    print("Symptoms file created")



if __name__ == "__main__":

    generate_dataset()