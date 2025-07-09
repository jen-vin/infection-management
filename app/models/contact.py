import uuid
from sqlalchemy import Column, String, Date
from sqlalchemy.dialects.postgresql import UUID
from app.models.db_base import Base

class Contact(Base):
    __tablename__ = 'contacts'
    contact_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    date = Column(Date, nullable=False)
    type = Column(String, nullable=False) 