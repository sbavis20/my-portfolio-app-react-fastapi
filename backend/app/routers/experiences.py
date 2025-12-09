from fastapi import APIRouter
from ..database import get_database

router = APIRouter(prefix="/api/experiences", tags=["Experiences"])


@router.get("")
async def get_all_experiences():
    db = get_database()
    items = await db.experiences.find({}).to_list(100)
    for item in items:
        item["_id"] = str(item["_id"])
    return items
