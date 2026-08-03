import pandas as pd
import os


BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)


DATASET_PATH = os.path.join(
    BASE_DIR,
    "datasets",
    "disease_dataset.csv"
)


df = pd.read_csv(DATASET_PATH)



def recommend_treatment(disease):

    result = df[
        df["Disease"] == disease
    ]


    if result.empty:

        return [], [], []



    row = result.iloc[0]



    orthodox = [
        row["Orthodox (Conventional) Treatment"]
    ]


    herbal = [
        row["Herbal / Traditional Remedies (commonly referenced)"]
    ]


    prevention = [
        str(row["Notes"])
    ] if pd.notna(row["Notes"]) else [
        "No prevention information available"
    ]


    return orthodox, herbal, prevention