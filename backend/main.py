from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow React to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data model
class Expense(BaseModel):
    title: str
    amount: str
    category: str
    date: str


@app.get("/")
def home():
    return {"message": "Backend is running!"}


@app.post("/expense")
def add_expense(expense: Expense):
    print("Expense received:", expense)

    return {
        "message": "Expense received successfully!",
        "expense": expense
    }