DISEASE_PROFILES = {

    # ==========================
    # INFECTIOUS DISEASES
    # ==========================

    "Malaria": {
        "core": [
            "fever",
            "chills",
            "headache",
            "body ache",
            "fatigue"
        ],
        "optional": [
            "nausea",
            "vomiting",
            "loss of appetite",
            "weakness",
            "sweating"
        ]
    },


    "Typhoid Fever": {
        "core": [
            "fever",
            "headache",
            "fatigue",
            "abdominal pain"
        ],
        "optional": [
            "diarrhea",
            "constipation",
            "nausea",
            "vomiting",
            "loss of appetite"
        ]
    },


    "Cholera": {
        "core": [
            "diarrhea",
            "vomiting",
            "weakness"
        ],
        "optional": [
            "abdominal pain",
            "dehydration",
            "fatigue",
            "dizziness"
        ]
    },


    "Tuberculosis": {
        "core": [
            "cough",
            "fatigue",
            "weight loss",
            "night sweats"
        ],
        "optional": [
            "fever",
            "chest pain",
            "difficulty breathing",
            "loss of appetite"
        ]
    },


    "COVID-19": {
        "core": [
            "fever",
            "dry cough",
            "fatigue"
        ],
        "optional": [
            "loss of smell",
            "loss of taste",
            "sore throat",
            "shortness of breath",
            "headache"
        ]
    },


    "Influenza": {
        "core": [
            "fever",
            "cough",
            "body ache",
            "fatigue"
        ],
        "optional": [
            "headache",
            "sore throat",
            "chills",
            "runny nose"
        ]
    },


    "Common Cold": {
        "core": [
            "runny nose",
            "sneezing",
            "sore throat"
        ],
        "optional": [
            "cough",
            "headache",
            "fatigue",
            "nasal congestion"
        ]
    },


    "Pneumonia": {
        "core": [
            "cough",
            "fever",
            "difficulty breathing",
            "chest pain"
        ],
        "optional": [
            "fatigue",
            "chills",
            "body ache"
        ]
    },


    "Hepatitis B": {
        "core": [
            "fatigue",
            "yellow eyes",
            "yellow skin"
        ],
        "optional": [
            "abdominal pain",
            "loss of appetite",
            "nausea",
            "weakness"
        ]
    },


    "Hepatitis A": {
        "core": [
            "yellow eyes",
            "yellow skin",
            "fatigue"
        ],
        "optional": [
            "nausea",
            "vomiting",
            "abdominal pain",
            "fever"
        ]
    },


    "HIV/AIDS": {
        "core": [
            "fatigue",
            "weight loss",
            "swollen lymph nodes"
        ],
        "optional": [
            "fever",
            "night sweats",
            "weakness",
            "mouth ulcers"
        ]
    },


    "Chickenpox": {
        "core": [
            "fever",
            "skin rash",
            "itching"
        ],
        "optional": [
            "fatigue",
            "headache",
            "weakness"
        ]
    },


    "Measles": {
        "core": [
            "fever",
            "skin rash",
            "cough"
        ],
        "optional": [
            "runny nose",
            "red eyes",
            "fatigue"
        ]
    },


    "Mumps": {
        "core": [
            "swollen lymph nodes",
            "fever"
        ],
        "optional": [
            "headache",
            "fatigue",
            "ear pain",
            "difficulty swallowing"
        ]
    },


    "Meningitis": {
        "core": [
            "fever",
            "stiff neck",
            "headache"
        ],
        "optional": [
            "confusion",
            "seizures",
            "vomiting",
            "fatigue"
        ]
    },

    # ==========================
    # GASTROINTESTINAL DISEASES
    # ==========================

    "Food Poisoning": {
        "core": [
            "nausea",
            "vomiting",
            "diarrhea",
            "abdominal pain"
        ],
        "optional": [
            "fever",
            "weakness",
            "fatigue",
            "dizziness"
        ]
    },


    "Gastroenteritis": {
        "core": [
            "diarrhea",
            "vomiting",
            "abdominal pain"
        ],
        "optional": [
            "fever",
            "nausea",
            "fatigue",
            "weakness"
        ]
    },


    "Peptic Ulcer Disease": {
        "core": [
            "abdominal pain",
            "stomach pain"
        ],
        "optional": [
            "nausea",
            "vomiting",
            "loss of appetite",
            "weight loss"
        ]
    },


    "Gastritis": {
        "core": [
            "stomach pain",
            "nausea"
        ],
        "optional": [
            "vomiting",
            "loss of appetite",
            "abdominal pain",
            "fatigue"
        ]
    },


    "Dysentery": {
        "core": [
            "diarrhea",
            "abdominal pain"
        ],
        "optional": [
            "blood in urine",
            "fever",
            "weakness",
            "fatigue"
        ]
    },

        # ==========================
    # RESPIRATORY DISEASES
    # ==========================

    "Asthma": {
        "core": [
            "wheezing",
            "shortness of breath",
            "difficulty breathing"
        ],
        "optional": [
            "chest pain",
            "cough",
            "fatigue"
        ]
    },


    "Bronchitis": {
        "core": [
            "cough",
            "productive cough",
            "chest pain"
        ],
        "optional": [
            "fever",
            "fatigue",
            "shortness of breath",
            "wheezing"
        ]
    },


    "Sinusitis": {
        "core": [
            "headache",
            "nasal congestion",
            "runny nose"
        ],
        "optional": [
            "facial pain",
            "fever",
            "sore throat",
            "fatigue"
        ]
    },


    "Tonsillitis": {
        "core": [
            "sore throat",
            "painful swallowing"
        ],
        "optional": [
            "fever",
            "swollen lymph nodes",
            "headache",
            "fatigue"
        ]
    },


    "Allergic Rhinitis": {
        "core": [
            "sneezing",
            "runny nose",
            "nasal congestion"
        ],
        "optional": [
            "itching",
            "cough",
            "headache",
            "fatigue"
        ]
    },

        # ==========================
    # SKIN DISEASES
    # ==========================

    "Ringworm": {
        "core": [
            "skin rash",
            "itching"
        ],
        "optional": [
            "skin irritation",
            "skin dryness",
            "skin lesion"
        ]
    },


    "Scabies": {
        "core": [
            "itching",
            "skin rash"
        ],
        "optional": [
            "skin irritation",
            "skin lesion",
            "redness"
        ]
    },


    "Eczema": {
        "core": [
            "skin rash",
            "itching",
            "skin dryness"
        ],
        "optional": [
            "skin irritation",
            "skin redness",
            "skin lesion"
        ]
    },


    "Acne": {
        "core": [
            "acne or pimples",
            "skin lesion"
        ],
        "optional": [
            "skin irritation",
            "skin redness",
            "pain"
        ]
    },


    "Fungal Skin Infection": {
        "core": [
            "skin rash",
            "itching",
            "skin irritation"
        ],
        "optional": [
            "skin dryness",
            "skin lesion",
            "redness"
        ]
    },

        # ==========================
    # GASTROINTESTINAL DISEASES
    # ==========================

    "Food Poisoning": {
        "core": [
            "nausea",
            "vomiting",
            "diarrhea"
        ],
        "optional": [
            "stomach pain",
            "fever",
            "fatigue",
            "abdominal pain"
        ]
    },


    "Gastroenteritis": {
        "core": [
            "diarrhea",
            "vomiting",
            "stomach pain"
        ],
        "optional": [
            "nausea",
            "fever",
            "fatigue",
            "abdominal pain"
        ]
    },


    "Cholera": {
        "core": [
            "diarrhea",
            "vomiting"
        ],
        "optional": [
            "dehydration",
            "stomach pain",
            "nausea",
            "fatigue"
        ]
    },


    "Typhoid Fever": {
        "core": [
            "fever",
            "headache",
            "fatigue"
        ],
        "optional": [
            "abdominal pain",
            "diarrhea",
            "nausea",
            "vomiting"
        ]
    },


    "Peptic Ulcer Disease": {
        "core": [
            "stomach pain",
            "burning abdominal pain"
        ],
        "optional": [
            "nausea",
            "vomiting",
            "heartburn",
            "fatigue"
        ]
    },

        # ==========================
    # VECTOR-BORNE & TROPICAL DISEASES
    # ==========================

    "Malaria": {
        "core": [
            "fever",
            "chills",
            "headache"
        ],
        "optional": [
            "fatigue",
            "nausea",
            "vomiting",
            "body ache",
            "sweating"
        ]
    },


    "Dengue Fever": {
        "core": [
            "fever",
            "headache",
            "body ache"
        ],
        "optional": [
            "fatigue",
            "nausea",
            "vomiting",
            "skin rash"
        ]
    },


    "Yellow Fever": {
        "core": [
            "fever",
            "headache",
            "fatigue"
        ],
        "optional": [
            "jaundice",
            "nausea",
            "vomiting",
            "muscle pain"
        ]
    },


    "Schistosomiasis": {
        "core": [
            "abdominal pain",
            "diarrhea"
        ],
        "optional": [
            "blood in stool",
            "fever",
            "fatigue",
            "nausea"
        ]
    },


    "Bilharzia": {
        "core": [
            "blood in urine",
            "abdominal pain"
        ],
        "optional": [
            "fever",
            "fatigue",
            "painful urination",
            "diarrhea"
        ]
    },

        # ==========================
    # CHRONIC & COMMON CONDITIONS
    # ==========================

    "Diabetes Mellitus": {
        "core": [
            "excessive thirst",
            "frequent urination",
            "fatigue"
        ],
        "optional": [
            "weight loss",
            "increased appetite",
            "weakness"
        ]
    },


    "Hypertension": {
        "core": [
            "headache",
            "dizziness"
        ],
        "optional": [
            "chest pain",
            "fatigue",
            "shortness of breath",
            "blurred vision"
        ]
    },


    "Anemia": {
        "core": [
            "fatigue",
            "weakness"
        ],
        "optional": [
            "dizziness",
            "shortness of breath",
            "pale skin",
            "headache"
        ]
    },


    "Asthma Attack": {
        "core": [
            "shortness of breath",
            "wheezing"
        ],
        "optional": [
            "chest tightness",
            "cough",
            "difficulty breathing",
            "fatigue"
        ]
    },


    "Heart Disease": {
        "core": [
            "chest pain",
            "shortness of breath"
        ],
        "optional": [
            "fatigue",
            "dizziness",
            "palpitations",
            "weakness"
        ]
    },


    "Kidney Disease": {
        "core": [
            "frequent urination",
            "fatigue"
        ],
        "optional": [
            "swelling",
            "back pain",
            "nausea",
            "weakness"
        ]
    },


    "Urinary Tract Infection (UTI)": {
        "core": [
            "painful urination",
            "frequent urination"
        ],
        "optional": [
            "lower abdominal pain",
            "fever",
            "blood in urine",
            "fatigue"
        ]
    },


    "Migraine": {
        "core": [
            "headache"
        ],
        "optional": [
            "nausea",
            "vomiting",
            "dizziness",
            "blurred vision"
        ]
    },


    "Arthritis": {
        "core": [
            "joint pain",
            "joint stiffness"
        ],
        "optional": [
            "swelling",
            "fatigue",
            "weakness"
        ]
    },


    "Depression": {
        "core": [
            "low mood",
            "fatigue"
        ],
        "optional": [
            "insomnia",
            "loss of appetite",
            "weakness",
            "lack of interest"
        ]
    },

        # ==========================
    # ADDITIONAL COMMON DISEASES
    # ==========================

    "Sickle Cell Disease": {
        "core": [
            "fatigue",
            "body ache"
        ],
        "optional": [
            "joint pain",
            "weakness",
            "fever",
            "pain"
        ]
    },


    "Gastroesophageal Reflux Disease (GERD)": {
        "core": [
            "heartburn",
            "burning abdominal pain"
        ],
        "optional": [
            "nausea",
            "chest pain",
            "difficulty swallowing",
            "cough"
        ]
    },


    "Appendicitis": {
        "core": [
            "abdominal pain",
            "nausea"
        ],
        "optional": [
            "vomiting",
            "fever",
            "loss of appetite",
            "fatigue"
        ]
    },


    "Conjunctivitis (Eye Infection)": {
        "core": [
            "eye redness",
            "eye discharge"
        ],
        "optional": [
            "itchy eye",
            "eye pain",
            "swelling"
        ]
    },


    "Ear Infection (Otitis Media)": {
        "core": [
            "ear pain",
            "ear swelling"
        ],
        "optional": [
            "fever",
            "headache",
            "fluid in ear",
            "diminished hearing"
        ]
    },


    "Skin Allergy": {
        "core": [
            "skin rash",
            "itching"
        ],
        "optional": [
            "skin redness",
            "skin swelling",
            "skin irritation"
        ]
    },


}

