from sqlalchemy import create_engine
from models import Base
import os

os.makedirs("data", exist_ok=True)
engine = create_engine("sqlite:///data/attendance.db", echo=False, future=True)
Base.metadata.create_all(engine)
print("DB ready at data/attendance.db")
