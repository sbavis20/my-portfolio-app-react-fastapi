from fastapi import APIRouter
from ..database import get_database

router = APIRouter(prefix="/api/achievements", tags=["Achievements"])


@router.get("")
async def get_all_achievements():
    db = get_database()
    items = await db.achievements.find({}).to_list(100)
    for item in items:
        item["_id"] = str(item["_id"])
    return items
