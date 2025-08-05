from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from config import settings

# SQLite非同期接続用URL（configから取得）
ASYNC_DB_URL = settings.DATABASE_URL.replace("sqlite:///", "sqlite+aiosqlite:///")

async_engine = create_async_engine(ASYNC_DB_URL, echo=True)
async_session = sessionmaker(
    autocommit=False, autoflush=False, bind=async_engine, class_=AsyncSession
)

Base = declarative_base()

async def get_db():
    async with async_session() as session:
        yield session
        