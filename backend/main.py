from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector

app = FastAPI()
# Connect to MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="nandini!1313!",
    database="expense_tracker"
)

cursor = db.cursor()

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
    type: str
    category: str
    date: str


@app.get("/")
def home():
    return {"message": "Backend is running!"}


@app.post("/expense")
def add_expense(expense: Expense):

    sql = """INSERT INTO expenses (title, amount, category, expense_date, type)VALUES (%s, %s, %s, %s, %s)"""

    values = (
        expense.title,
        expense.amount,
        expense.category,
        expense.date,
        expense.type
    )

    cursor.execute(sql, values)
    db.commit()

    return {
        "message": "Expense saved to MySQL successfully!"
    }

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
    sql = "DELETE FROM expenses WHERE id = %s"
    cursor.execute(sql, (expense_id,))
    db.commit()

    return {"message": "Expense deleted successfully!"}

@app.put("/expense/{expense_id}")
def update_expense(expense_id: int, expense: Expense):
    sql = """UPDATE expenses SET title=%s, amount=%s, category=%s, expense_date=%s,type=%s, WHERE id=%s"""

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