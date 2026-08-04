# AI-Based Disease Detection and Treatment Recommendation System

## Overview

The **AI-Based Disease Detection and Treatment Recommendation System** is an intelligent healthcare assistant that uses Artificial Intelligence, Natural Language Processing (NLP), and Machine Learning to help users identify possible diseases based on their symptoms and receive recommended treatment information.

The system provides an interactive chatbot-style interface where users can describe their symptoms naturally. The backend processes the input, extracts important symptoms, predicts the most likely disease, and provides relevant treatment recommendations.

This project was developed as a Final Year Computer Science Project at the University of Ghana.

---

# Problem Statement

Access to quick healthcare guidance remains a challenge for many people, especially in areas where medical professionals and healthcare facilities may not always be immediately available.

Many individuals experience symptoms but lack the ability to understand possible causes or know the appropriate next steps.

This project aims to provide an AI-powered assistant that can support preliminary health assessment by analysing symptoms and providing possible disease predictions and treatment information.

The system is designed as an assistance tool and does not replace professional medical diagnosis.

---

# Objectives

The objectives of this project are:

- Develop an AI-based system capable of predicting diseases from user symptoms.
- Apply Natural Language Processing techniques to extract symptoms from user input.
- Build a machine learning classification model for disease prediction.
- Provide treatment recommendations based on predicted diseases.
- Develop an interactive chatbot interface for easy communication.
- Allow users to manage their accounts and conversation history.
- Provide a scalable architecture for future healthcare AI improvements.

---

# System Architecture

The system follows a client-server architecture.

             User
              |
              |
      React Frontend
              |
              |
         FastAPI API
              |
    ---------------------
    |                   |

---

# Technologies Used

## Frontend

- React.js
- Vite
- React Router
- CSS
- Axios
- React Icons

## Backend

- Python
- FastAPI
- REST API
- Pydantic

## Artificial Intelligence

- Scikit-learn
- Natural Language Processing (NLP)
- TF-IDF Vectorization
- Machine Learning Classification
- Symptom Extraction

## Authentication and Database

- Firebase Authentication
- Firebase Firestore

## Development Tools

- Git and GitHub
- Visual Studio Code
- Python Virtual Environment
- Node.js and npm

---

# Main Features

## Authentication

- User registration
- User login
- Secure authentication using Firebase
- Logout functionality

---

## AI Disease Detection

- Users enter symptoms using natural language.
- NLP preprocessing extracts important symptoms.
- Machine learning model predicts possible diseases.
- Confidence score is generated for predictions.

---

## Treatment Recommendation

The system provides recommended treatments based on the predicted disease.

Recommendations may include:

- General medical guidance
- Orthodox treatment information
- Herbal treatment information where available

---

## Chat Interface

- Modern chatbot-style interface
- Real-time conversation experience
- Typing animation
- Previous conversation retrieval
- Conversation deletion

---

## User Settings

Users can:

- Update profile information
- Change password
- Switch between dark and light themes
- Clear conversation history
- Delete their account
- View privacy information

---

# Project Structure

Final-Year-Project
│
├── backend
│ │
│ ├── app.py
│ ├── requirements.txt
│ │
│ ├── models
│ │ ├── disease_model.pkl
│ │ └── vectorizer.pkl
│ │
│ ├── ml
│ │ ├── train_model.py
│ │ └── predict.py
│ │
│ ├── nlp
│ │ ├── preprocess.py
│ │ └── symptom_extractor.py
│ │
│ ├── recommender
│ │ └── treatment.py
│ │
│ └── datasets
│ ├── disease_dataset.csv
│ └── symptoms_dataset.csv
│
│
├── frontend
│ │
│ ├── package.json
│ ├── index.html
│ │
│ ├── public
│ │ └── logo.png
│ │
│ └── src
│ │
│ ├── components
│ │
│ ├── pages
│ │
│ ├── context
│ │
│ ├── hooks
│ │
│ ├── services
│ │
│ └── firebase
│
│
└── README.md

---

# Requirements

Before running the project, install:

### Backend Requirements

- Python 3.10+
- pip

Check Python:

```bash
python --version

1. Clone the Repository

Clone the project from GitHub:

git clone <repository-url>

Navigate into the project directory:

cd Final-Year-Project
2. Backend Installation and Setup

Navigate to the backend folder:

cd backend
Create a Virtual Environment

A virtual environment is used to isolate backend dependencies.

Create the environment:

python -m venv venv
Activate Virtual Environment
Windows
venv\Scripts\activate
Linux/Mac
source venv/bin/activate

After activation, the terminal should display the virtual environment name.

Example:

(venv) C:\Final-Year-Project\backend>
Install Backend Dependencies

Install all required Python packages:

pip install -r requirements.txt
Backend Configuration

Ensure the required files are available:

backend
│
├── app.py
├── requirements.txt
│
├── models
│   ├── disease_model.pkl
│   └── vectorizer.pkl
│
├── datasets
│   ├── disease_dataset.csv
│   └── symptoms_dataset.csv
│
└── ...

The trained machine learning model files must be present before running the API.

3. Start Backend Server

From the backend directory, run:

uvicorn app:app --reload

If successful, the terminal will display:

Uvicorn running on http://127.0.0.1:8000

The backend API is now running.

Backend URL:

http://127.0.0.1:8000

FastAPI documentation:

http://127.0.0.1:8000/docs

Keep this terminal running.

4. Frontend Installation and Setup

Open a new terminal window.

Navigate to the frontend folder:

cd frontend
Install Frontend Dependencies

Run:

npm install

This installs all required React packages.

5. Configure Frontend Environment Variables

Create a .env file inside the frontend folder:

frontend
│
├── .env
├── package.json
└── src

Add Firebase configuration:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

Replace the values with your Firebase project credentials.

6. Start Frontend Application

From the frontend directory, run:

npm run dev

The terminal will display something similar to:

Local: http://localhost:5173/

Open the link in your browser:

http://localhost:5173
Running the Complete Application

The application requires both servers to run at the same time.

Terminal 1 - Start Backend

Navigate to backend:

cd backend

Activate virtual environment:

Windows:

venv\Scripts\activate

Start FastAPI:

uvicorn app:app --reload

Backend runs at:

http://127.0.0.1:8000
Terminal 2 - Start Frontend

Navigate to frontend:

cd frontend

Start React application:

npm run dev

Frontend runs at:

http://localhost:5173
Using the Application

After both servers are running:

Open the frontend URL:
http://localhost:5173
Create an account or login.
Enter symptoms through the chatbot interface.

Example:

I have fever, headache, body pain and vomiting
The system will:
Process the symptoms using NLP.
Convert symptoms into machine-learning features.
Predict a possible disease.
Display the confidence score.
Provide treatment recommendations.
Training the Machine Learning Model (Optional)

If the model needs to be retrained:

Navigate to:

backend/ml

Run:

python train_model.py

The generated model files will be saved in:

backend/models/

Example:

disease_model.pkl
vectorizer.pkl
Stopping the Application

To stop either server:

Press:

CTRL + C

in the respective terminal.

Common Issues and Solutions
Backend Module Errors

Activate the virtual environment:

venv\Scripts\activate

Reinstall dependencies:

pip install -r requirements.txt
Frontend Package Errors

Remove existing packages:

Windows:

rmdir /s /q node_modules

Mac/Linux:

rm -rf node_modules

Install again:

npm install
Port Already in Use

Run backend on another port:

uvicorn app:app --reload --port 8001

Run frontend on another port:

npm run dev -- --port 5174
Successful Setup

When both services are running correctly:

Frontend
http://localhost:5173

        |
        |
        ↓

Backend API
http://127.0.0.1:8000

        |
        |
        ↓

Machine Learning Disease Prediction System

The AI Disease Detection and Treatment Recommendation System is now ready to use.
