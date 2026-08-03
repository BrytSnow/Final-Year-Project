import os
import joblib
import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer


BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

DATASET_PATH = os.path.join(
    BASE_DIR,
    "datasets",
    "disease_dataset.csv"
)

VECTORIZER_PATH = os.path.join(
    BASE_DIR,
    "models",
    "disease_vectorizer.pkl"
)

MATRIX_PATH = os.path.join(
    BASE_DIR,
    "models",
    "disease_matrix.pkl"
)


df = pd.read_csv(DATASET_PATH)

documents = (
    df["Disease"].fillna("") + " " +
    df["Common Symptoms"].fillna("") + " " +
    df["Category"].fillna("") + " " +
    df["Notes"].fillna("")
)

vectorizer = TfidfVectorizer(
    stop_words="english"
)

matrix = vectorizer.fit_transform(documents)

joblib.dump(vectorizer, VECTORIZER_PATH)
joblib.dump(matrix, MATRIX_PATH)

print("Knowledge base created.")