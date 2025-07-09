import uuid
from sqlalchemy import Column, String, Date
from sqlalchemy.dialects.postgresql import UUID
from app.models.db_base import Base

class Measure(Base):
    __tablename__ = 'measures'
    action_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    type = Column(String, nullable=False)
    start = Column(Date, nullable=False)
    end = Column(Date, nullable=True)
    status = Column(String, nullable=False) 