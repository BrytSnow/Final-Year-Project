import os
import faiss
import joblib
import pandas as pd
import numpy as np

from sentence_transformers import SentenceTransformer


# -------------------------------------------------------
# Paths
# -------------------------------------------------------

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

DATASET_PATH = os.path.join(
    BASE_DIR,
    "datasets",
    "disease_dataset.csv"
)

EMBEDDINGS_DIR = os.path.join(
    BASE_DIR,
    "embeddings"
)

INDEX_PATH = os.path.join(
    EMBEDDINGS_DIR,
    "faiss_index.bin"
)

METADATA_PATH = os.path.join(
    EMBEDDINGS_DIR,
    "disease_metadata.pkl"
)


# Create embeddings folder if it doesn't exist
os.makedirs(
    EMBEDDINGS_DIR,
    exist_ok=True
)


# -------------------------------------------------------
# Load Dataset
# -------------------------------------------------------

print("Loading dataset...")

df = pd.read_csv(DATASET_PATH)

df = df.fillna("")

print(f"Loaded {len(df)} diseases.")


# -------------------------------------------------------
# Load Embedding Model
# -------------------------------------------------------

print("Loading embedding model...")

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


# -------------------------------------------------------
# Build Documents
# -------------------------------------------------------

print("Preparing medical documents...")

documents = []

for _, row in df.iterrows():

    document = f"""
Disease: {row['Disease']}

Symptoms:
{row['Common Symptoms']}
"""

    documents.append(document.strip())


# -------------------------------------------------------
# Generate Embeddings
# -------------------------------------------------------

print("Generating embeddings...")

embeddings = model.encode(
    documents,
    convert_to_numpy=True,
    show_progress_bar=True
)


# Convert to float32 (required by FAISS)
embeddings = embeddings.astype(
    np.float32
)


# Normalize vectors for cosine similarity
faiss.normalize_L2(
    embeddings
)


# -------------------------------------------------------
# Build FAISS Index
# -------------------------------------------------------

dimension = embeddings.shape[1]

# Inner Product + normalized vectors = Cosine Similarity
index = faiss.IndexFlatIP(
    dimension
)

index.add(
    embeddings
)


# -------------------------------------------------------
# Save Index
# -------------------------------------------------------

faiss.write_index(
    index,
    INDEX_PATH
)

joblib.dump(
    df.to_dict("records"),
    METADATA_PATH
)


print("\nKnowledge base created successfully!")

print(f"Diseases indexed : {len(df)}")

print(f"Embedding size   : {dimension}")

print(f"FAISS index      : {INDEX_PATH}")

print(f"Metadata         : {METADATA_PATH}")