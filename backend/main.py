from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector
from dotenv import load_dotenv
import os

app = FastAPI()

load_dotenv()

db = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    port=int(os.getenv("DB_PORT")),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME"),
    ssl_disabled=False,
    ssl_ca=os.path.join(os.path.dirname(__file__), "ca.pem")
)

cursor = db.cursor()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://smart-expense-tracker-nuzvejajr-nandini-projects1.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Expense(BaseModel):
    title: str
    amount: float
    type: str
    category: str
    date: str


@app.get("/")
def home():
    return {"message": "Backend is running!"}


@app.post("/expense")
def add_expense(expense: Expense):

    sql = """
    INSERT INTO expenses
    (title, amount, category, expense_date, type)
    VALUES (%s, %s, %s, %s, %s)
    """

    values = (
        expense.title,
        expense.amount,
        expense.category,
        expense.date,
        expense.type,
    )

    cursor.execute(sql, values)
    db.commit()

    return {"message": "Expense saved successfully!"}


@app.get("/expenses")
def get_expenses():

    cursor.execute("SELECT * FROM expenses")

    rows = cursor.fetchall()

    expenses = []

    for row in rows:
        expenses.append({
            "id": row[0],
            "title": row[1],
            "amount": float(row[2]),
            "category": row[3],
            "date": str(row[4]),
            "type": row[5],
        })

    return expenses


@app.delete("/expense/{expense_id}")
def delete_expense(expense_id: int):

    cursor.execute(
        "DELETE FROM expenses WHERE id=%s",
        (expense_id,)
    )

    db.commit()

    return {"message": "Expense deleted successfully!"}


@app.put("/expense/{expense_id}")
def update_expense(expense_id: int, expense: Expense):

    sql = """
    UPDATE expenses
    SET
        title=%s,
        amount=%s,
        category=%s,
        expense_date=%s,
        type=%s
    WHERE id=%s
    """

    values = (
        expense.title,
        expense.amount,
        expense.category,
        expense.date,
        expense.type,
        expense_id,
    )

    cursor.execute(sql, values)
    db.commit()

    return {"message": "Expense updated successfully!"}