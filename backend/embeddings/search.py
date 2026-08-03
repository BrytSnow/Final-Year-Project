import os
import faiss
import joblib
import numpy as np

from sentence_transformers import SentenceTransformer


# -------------------------------------------------------
# Paths
# -------------------------------------------------------

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

INDEX_PATH = os.path.join(
    BASE_DIR,
    "embeddings",
    "faiss_index.bin"
)

METADATA_PATH = os.path.join(
    BASE_DIR,
    "embeddings",
    "disease_metadata.pkl"
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "all-MiniLM-L6-v2"
)


# -------------------------------------------------------
# Lazy-loaded resources
# -------------------------------------------------------

index = None
metadata = None
model = None


def load_resources():

    global index
    global metadata
    global model

    if index is None:
        print("Loading FAISS index...")
        index = faiss.read_index(INDEX_PATH)

    if metadata is None:
        print("Loading disease metadata...")
        metadata = joblib.load(METADATA_PATH)

    if model is None:
        print("Loading embedding model...")
        model = SentenceTransformer(
            MODEL_PATH,
            local_files_only=True
        )


# -------------------------------------------------------
# Semantic Search
# -------------------------------------------------------

def semantic_search(
    query,
    top_k=10,
    threshold=0.35
):

    load_resources()

    embedding = model.encode(
        [query],
        convert_to_numpy=True
    ).astype(np.float32)

    faiss.normalize_L2(embedding)

    scores, indices = index.search(
        embedding,
        top_k
    )

    results = []

    for score, idx in zip(
        scores[0],
        indices[0]
    ):

        if idx == -1:
            continue

        if score < threshold:
            continue

        disease = metadata[idx]

        results.append({

            "similarity": round(
                float(score),
                3
            ),

            "disease": disease.get(
                "Disease",
                ""
            ),

            "category": disease.get(
                "Category",
                ""
            ),

            "symptoms": disease.get(
                "Common Symptoms",
                ""
            ),

            "orthodox": disease.get(
                "Orthodox (Conventional) Treatment",
                ""
            ),

            "herbal": disease.get(
                "Herbal / Traditional Remedies (commonly referenced)",
                ""
            ),

            "notes": disease.get(
                "Notes",
                ""
            )

        })

    return results