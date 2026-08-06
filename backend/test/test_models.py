from huggingface_hub import list_models


models = list_models(
    search="skin disease image classification",
    limit=10
)


for model in models:
    print(model.id)