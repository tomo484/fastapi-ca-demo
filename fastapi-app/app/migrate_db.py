from sqlalchemy import create_engine
from config import settings

from app.models.task import Base
# SQLite同期接続用URL（configから取得）
DB_URL = settings.DATABASE_URL
engine = create_engine(DB_URL, echo=True)

def reset_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    reset_database()