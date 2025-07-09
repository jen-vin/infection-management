import uuid
from sqlalchemy import Column, String, Date
from sqlalchemy.dialects.postgresql import UUID
from app.models.db_base import Base

class Case(Base):
    __tablename__ = 'cases'
    case_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    reporting_date = Column(Date, nullable=False)
    status = Column(String, nullable=False) 