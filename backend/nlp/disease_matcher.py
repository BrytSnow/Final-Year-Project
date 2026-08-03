import os
import re
import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# -------------------------------------------------------
# Load Dataset
# -------------------------------------------------------

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

DATASET_PATH = os.path.join(
    BASE_DIR,
    "datasets",
    "West_Africa_Common_Diseases.csv"
)

df = pd.read_csv(DATASET_PATH)

df = df.fillna("")


# -------------------------------------------------------
# Normalize Disease Names
# -------------------------------------------------------

def normalize_disease(name):

    name = str(name)

    lower = name.lower()

    if "malaria" in lower:
        return "Malaria"

    if "covid" in lower:
        return "COVID-19"

    if "influenza" in lower:
        return "Influenza"

    if "common cold" in lower:
        return "Common Cold"

    return re.sub(r"\(.*?\)", "", name).strip()


df["Disease"] = df["Disease"].apply(
    normalize_disease
)


# -------------------------------------------------------
# Symptom Text
# -------------------------------------------------------

symptoms = df["Common Symptoms"].astype(str)

vectorizer = TfidfVectorizer(
    stop_words="english"
)

symptom_vectors = vectorizer.fit_transform(
    symptoms
)

SYMPTOM_MAP = {

    "high temperature": "fever",

    "temperature": "fever",

    "body pain": "body ache",

    "body hurts": "body ache",

    "aching body": "body ache",

    "throwing up": "vomiting",

    "throw up": "vomiting",

    "running stomach": "diarrhea",

    "loose stool": "diarrhea",

    "can't breathe": "difficulty breathing",

    "cannot breathe": "difficulty breathing",

    "breathing difficulty": "difficulty breathing",

    "tired": "fatigue",

    "weak": "weakness"
}


def preprocess_text(text):

    text = text.lower()

    for phrase, replacement in SYMPTOM_MAP.items():

        text = text.replace(
            phrase,
            replacement
        )

    return text

# -------------------------------------------------------
# Helper Function
# -------------------------------------------------------

def split_items(text):

    if pd.isna(text) or str(text).strip() == "":
        return []

    # Split on semicolons first, then commas if needed
    if ";" in str(text):
        items = str(text).split(";")
    else:
        items = str(text).split(",")

    return [
        item.strip()
        for item in items
        if item.strip()
    ]


# -------------------------------------------------------
# Disease Matching
# -------------------------------------------------------

def match_disease(user_input, top_k=3):

    # Preprocess user text
    user_input = preprocess_text(user_input)

    # Convert user text to TF-IDF vector
    user_vector = vectorizer.transform([user_input])

    # Calculate similarity
    similarity_scores = cosine_similarity(
        user_vector,
        symptom_vectors
    )[0]

    # Copy dataframe so we don't modify the original
    results_df = df.copy()

    results_df["confidence"] = similarity_scores * 100

    # Sort by confidence
    results_df = results_df.sort_values(
        by="confidence",
        ascending=False
    )

    # Remove duplicate diseases
    results_df = results_df.drop_duplicates(
        subset="Disease"
    )

    # Keep only the top matches
    results_df = results_df.head(top_k)

    results = []

    for _, row in results_df.iterrows():

        results.append({

            "disease": row["Disease"],

            "category": row["Category"],

            "confidence": round(
                float(row["confidence"]),
                2
            ),

            "symptoms": split_items(
                row["Common Symptoms"]
            ),

            "orthodox": split_items(
                row["Orthodox (Conventional) Treatment"]
            ),

            "herbal": split_items(
                row["Herbal / Traditional Remedies (commonly referenced)"]
            ),

            "notes": row["Notes"]

        })

    return results