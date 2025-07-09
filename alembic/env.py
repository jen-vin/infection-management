import os
from dotenv import load_dotenv
load_dotenv()
from sqlalchemy import create_engine
from app.models.db_base import Base
from app.models.user import User
from app.models.region import Region
from app.models.measure import Measure
from app.models.case import Case
from app.models.person import Person
from app.models.contact import Contact

target_metadata = Base.metadata

# ... bestehender Alembic-Code ...
database_url = os.getenv("DATABASE_URL")
engine = create_engine(database_url) 