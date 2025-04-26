import os
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SERVICE_ACCOUNT_PATH = os.path.join(BASE_DIR, "app", "secrets", "ecoquest-1d6af-firebase-adminsdk-fbsvc-94146cbe3d.json")

cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
firebase_admin.initialize_app(cred)

db = firestore.client()

def add_report(report_data):
    report_ref = db.collection('reports').document()
    if not report_data.timestamp:
        report_data.timestamp = datetime.utcnow().isoformat()

    report_ref.set(report_data.dict())

    user_ref = db.collection('users').document(report_data.username)
    user_doc = user_ref.get()

    if user_doc.exists:
        user_ref.update({
            'points': firestore.Increment(10)
        })
    else:
        user_ref.set({
            'username': report_data.username,
            'points': 10
        })

def get_leaderboard():
    users_ref = db.collection('users').order_by('points', direction=firestore.Query.DESCENDING).limit(10)
    users = users_ref.stream()
    return [{"username": user.to_dict()["username"], "points": user.to_dict()["points"]} for user in users]