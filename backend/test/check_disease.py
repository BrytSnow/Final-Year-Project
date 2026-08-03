import pandas as pd

df = pd.read_csv("datasets/disease_dataset.csv")

print("Total diseases:")
print(df["disease"].nunique())

print("\nDisease list:")
for disease in sorted(df["disease"].unique()):
    print(disease)