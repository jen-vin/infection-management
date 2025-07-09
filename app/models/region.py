import uuid
from sqlalchemy import Column, String, Integer
from sqlalchemy.dialects.postgresql import UUID
from app.models.db_base import Base

class Region(Base):
    __tablename__ = 'regions'
    region_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    plz = Column(String, nullable=False)
    population = Column(Integer, nullable=False)
    type = Column(String, nullable=False) 