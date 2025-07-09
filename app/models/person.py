import uuid
from sqlalchemy import Column, String, Date, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.models.db_base import Base

class Person(Base):
    __tablename__ = 'persons'
    person_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    birthdate = Column(Date, nullable=False)
    address = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    mail = Column(String, nullable=False)
    role = Column(String, nullable=False)
    region_id = Column(UUID(as_uuid=True), ForeignKey('regions.region_id'), nullable=False) 