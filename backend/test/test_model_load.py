from tensorflow.keras.models import load_model


model_path = "models/best_skin_model.keras"


print("Loading model...")


model = load_model(
    model_path
)


print("Model loaded successfully")

model.summary()