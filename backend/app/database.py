from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings

client: AsyncIOMotorClient = None
db = None


async def connect_to_mongodb():
    global client, db
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.DATABASE_NAME]
    print(f"✅ Connected to MongoDB database: {settings.DATABASE_NAME}")


async def close_mongodb_connection():
    global client
    if client:
        client.close()
        print("🔌 MongoDB connection closed")


def get_database():
    return db
