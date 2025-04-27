import os
import random
from datetime import datetime, timedelta, timezone
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SERVICE_ACCOUNT_PATH = os.path.join(BASE_DIR, "app", "secrets", "ecoquest-1d6af-firebase-adminsdk-fbsvc-94146cbe3d.json")

cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
firebase_admin.initialize_app(cred)

db = firestore.client()

def delete_collection(collection_name, batch_size=100):
    collection_ref = db.collection(collection_name)
    docs = collection_ref.limit(batch_size).stream()

    deleted = 0
    for doc in docs:
        doc.reference.delete()
        deleted += 1

    if deleted >= batch_size:
        return delete_collection(collection_name, batch_size)

print("Deleting old users and reports...")
delete_collection('users')
delete_collection('reports')
print("Old data deleted!")

sample_users = [
    {"username": "EcoWarrior12", "points": 0},
    {"username": "CleanQueen", "points": 0},
    {"username": "TrashTamer", "points": 0},
    {"username": "GreenGuardian", "points": 0},
    {"username": "RecycleRanger", "points": 0},
    {"username": "CitySavior", "points": 0},
    {"username": "TrashTrooper", "points": 0},
    {"username": "WasteWizard", "points": 0},
    {"username": "ParkProtector", "points": 0},
    {"username": "EcoChamp", "points": 0},
    {"username": "NatureNinja", "points": 0},
    {"username": "CleanCrusader", "points": 0},
    {"username": "GreenKnight", "points": 0},
    {"username": "PollutionPatrol", "points": 0},
    {"username": "StreetSweeper", "points": 0}
]

for user in sample_users:
    db.collection('users').document(user["username"]).set(user)

print(f"Inserted {len(sample_users)} users!")

descriptions = [
    "Overflowing trash bin near park.",
    "Litter scattered across the sidewalk.",
    "Illegal dumping near alley.",
    "Recyclable items mixed with trash.",
    "Debris blocking bike lane.",
    "Public bench area needs cleaning.",
    "Graffiti and waste around playground."
]

base_lat = 37.3350
base_lon = -121.8810

report_count = 0

for user in sample_users:
    num_reports = random.randint(2, 9)
    report_count += num_reports

    for _ in range(num_reports):
        lat_variation = random.uniform(-0.01, 0.01)
        lon_variation = random.uniform(-0.01, 0.01)
        timestamp = (datetime.now(timezone.utc) - timedelta(hours=random.randint(0, 48))).isoformat()

        image_choice = random.randint(1, 5)
        image_url = f"/images/{image_choice}.jpeg"

        report_data = {
            "username": user["username"],
            "description": random.choice(descriptions),
            "latitude": base_lat + lat_variation,
            "longitude": base_lon + lon_variation,
            "image_url": image_url,
            "timestamp": timestamp
        }

        db.collection('reports').add(report_data)

        user_ref = db.collection('users').document(user["username"])
        user_ref.update({
            'points': firestore.Increment(10)
        })

print(f"Inserted {report_count} reports!")