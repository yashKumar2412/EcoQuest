from fastapi import FastAPI
from app.models import Report
from app import db

app = FastAPI()

@app.post("/report")
def create_report(report: Report):
    db.add_report(report)
    return {"message": "Report submitted successfully."}

@app.get("/leaderboard")
def leaderboard():
    top_users = db.get_leaderboard()
    return {"leaderboard": top_users}