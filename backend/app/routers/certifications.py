from fastapi import APIRouter
from ..database import get_database

router = APIRouter(prefix="/api/certifications", tags=["Certifications"])


@router.get("")
async def get_all_certifications():
    db = get_database()
    items = await db.certifications.find({}).to_list(100)
    for item in items:
        item["_id"] = str(item["_id"])
    return items
