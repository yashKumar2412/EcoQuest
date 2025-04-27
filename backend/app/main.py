import os
import shutil
import uuid
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.models import Report
from app.db import add_report, get_leaderboard

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

@app.post("/report")
async def report(
    username: str = Form(...),
    description: str = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    timestamp: str = Form(...),
    file: UploadFile = File(...)
):
    try:
        ext = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4().hex}{ext}"
        file_location = os.path.join(UPLOAD_DIR, unique_filename)

        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        image_url = f"http://127.0.0.1:8000/uploads/{unique_filename}"

        report_data = Report(
            username=username,
            description=description,
            latitude=latitude,
            longitude=longitude,
            image_url=image_url,
            timestamp=timestamp
        )

        add_report(report_data)

        return JSONResponse(content={"message": "Report uploaded successfully!"})

    except Exception as e:
        print("Error during /report:", e)
        return JSONResponse(status_code=500, content={"message": str(e)})

@app.get("/leaderboard")
def leaderboard():
    try:
        top_users = get_leaderboard()
        return {"leaderboard": top_users}
    except Exception as e:
        print("Error during /leaderboard:", e)
        return JSONResponse(status_code=500, content={"message": str(e)})