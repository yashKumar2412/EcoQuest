from pydantic import BaseModel
from typing import Optional

class Report(BaseModel):
    username: str
    description: str
    latitude: float
    longitude: float
    image_url: str
    timestamp: Optional[str] = None

class User(BaseModel):
    username: str
    points: int