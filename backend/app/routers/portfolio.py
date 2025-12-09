from fastapi import APIRouter, HTTPException
from ..database import get_database

router = APIRouter(prefix="/api/portfolio", tags=["Portfolio"])


@router.get("")
async def get_all_portfolio_items():
    db = get_database()
    items = await db.portfolio_items.find({}).to_list(100)
    for item in items:
        item["_id"] = str(item["_id"])
    return items


@router.get("/{slug}")
async def get_portfolio_item_by_slug(slug: str):
    db = get_database()
    item = await db.portfolio_items.find_one({"slug": slug})
    if not item:
        raise HTTPException(status_code=404, detail="Portfolio item not found")
    item["_id"] = str(item["_id"])
    return item
