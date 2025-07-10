from sqlalchemy import Column, Integer, String, Date, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB
from app.models.db_base import Base
from sqlalchemy.types import ARRAY
from datetime import date


class Case(Base):
    __tablename__ = 'cases'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    status = Column(String, nullable=False)
    date_reported = Column(Date, nullable=False)
    region = Column(String, nullable=False)
    symptoms = Column(String, nullable=True)  # Kommagetrennt, alternativ ARRAY(String) für Postgres
    user_app_id = Column(String, nullable=False)
    contacts = Column(Integer, nullable=True)
    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    address = Column(String, nullable=True)
    test_date = Column(Date, nullable=True)
    test_result = Column(String, nullable=True)
    notes = Column(Text, nullable=True)
    # Komplexe Felder als JSON (z.B. für contactHistory, measures)
    contact_history = Column(JSONB, nullable=True)  # Liste von dicts
    measures = Column(JSONB, nullable=True)         # Liste von dicts

# Hinweis: Für andere DBs als Postgres ggf. JSON statt JSONB verwenden.
