from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import Report
from app import db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/report")
def create_report(report: Report):
    db.add_report(report)
    return {"message": "Report submitted successfully."}

@app.get("/leaderboard")
def leaderboard():
    top_users = db.get_leaderboard()
    return {"leaderboard": top_users}