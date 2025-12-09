from fastapi import APIRouter, Query
from typing import Optional
from ..database import get_database

router = APIRouter(prefix="/api/skills", tags=["Skills"])


@router.get("")
async def get_all_skills(category: Optional[str] = Query(None)):
    db = get_database()
    filter_query = {}
    if category:
        filter_query["category"] = {"$regex": category, "$options": "i"}
    items = await db.skills.find(filter_query).to_list(100)
    for item in items:
        item["_id"] = str(item["_id"])
    return items
