import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATASET_PATH = os.path.join(
    BASE_DIR,
    "datasets",
    "disease_dataset.csv"
)

OUTPUT_PATH = os.path.join(
    BASE_DIR,
    "datasets",
    "disease_dataset_top50.csv"
)

print("Loading dataset...")

df = pd.read_csv(DATASET_PATH)

# Count diseases
counts = df["disease"].value_counts()

print("\nTop 50 diseases:\n")
print(counts.head(50))

# Keep only the top 50 diseases
top50 = counts.head(50).index

filtered_df = df[df["disease"].isin(top50)]

print("\nOriginal dataset:", df.shape)
print("Filtered dataset:", filtered_df.shape)

filtered_df.to_csv(OUTPUT_PATH, index=False)

print(f"\nSaved to:\n{OUTPUT_PATH}")