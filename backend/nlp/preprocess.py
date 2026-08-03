import re
import string
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer


stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

def clean_text(text: str) -> str:
    """
    Lowercase, remove punctuation, numbers, and extra whitespace.
    """
    text = text.lower()
    text = re.sub(f"[{re.escape(string.punctuation)}]", " ", text)
    text = re.sub(r'\d+', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def tokenize(text: str) -> list:
    """
    Tokenize the text into words
    """
    return nltk.word_tokenize(text)

def remove_stopwords(tokens: list) -> list:
    """
    Remove common English stopwords
    """
    return [token for token in tokens if token not in stop_words]

def lemmatize_tokens(tokens: list) -> list:
    """
    Lemmatize each token
    """
    return [lemmatizer.lemmatize(token) for token in tokens]

def preprocess(text: str) -> list:
    """
    Full preprocessing pipeline: clean → tokenize → remove stopwords → lemmatize
    Returns list of clean tokens
    """
    text = clean_text(text)
    tokens = tokenize(text)
    tokens = remove_stopwords(tokens)
    tokens = lemmatize_tokens(tokens)
    return tokens