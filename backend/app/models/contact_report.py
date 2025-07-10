from sqlalchemy import Column, Integer, String, Date, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB
from app.models.db_base import Base
from sqlalchemy.types import ARRAY
from datetime import datetime

class ContactReport(Base):
    __tablename__ = 'reports'
    id = Column(Integer, primary_key=True, autoincrement=True)
    contact_1_id = Column(String, nullable=False)
    contact_2_id = Column(String, nullable=False)
    region = Column(String, nullable=False)
    contact_date = Column(Date, nullable=False)
    risk = Column(Integer, nullable=False)