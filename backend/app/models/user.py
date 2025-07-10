import uuid
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from app.models.db_base import Base

target_metadata = Base.metadata
Base = declarative_base()
class User(Base):
    __tablename__ = 'users'
    user_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True, nullable=False)
    pass_hash = Column(String, nullable=False)
    role = Column(String, nullable=False)
