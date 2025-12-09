from fastapi import APIRouter
from ..database import get_database

router = APIRouter(prefix="/api/education", tags=["Education"])


@router.get("")
async def get_all_education():
    db = get_database()
    items = await db.education.find({}).to_list(100)
    for item in items:
        item["_id"] = str(item["_id"])
    return items
