from fastapi import APIRouter
from ..database import get_database

router = APIRouter(prefix="/api/publications", tags=["Publications"])


@router.get("")
async def get_all_publications():
    db = get_database()
    items = await db.publications.find({}).to_list(100)
    for item in items:
        item["_id"] = str(item["_id"])
    return items
