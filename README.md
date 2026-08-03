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