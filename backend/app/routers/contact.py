from fastapi import APIRouter
from ..database import get_database

router = APIRouter(prefix="/api/contact", tags=["Contact"])


@router.get("")
async def get_contact_info():
    db = get_database()
    items = await db.contact_info.find({}).to_list(10)
    for item in items:
        item["_id"] = str(item["_id"])
    return items
