from sqlalchemy import Column, Integer, String, LargeBinary, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)
    roll_no = Column(String, unique=True, index=True)
    section = Column(String, index=True)
    embedding = Column(LargeBinary, nullable=False)

class Attendance(Base):
    __tablename__ = "attendance"
    id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey("students.id"), index=True)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    section = Column(String, index=True)
    status = Column(String, default="present")
    device_id = Column(String, default="webcam-1")

    student = relationship("Student")

    __table_args__ = (
        UniqueConstraint('student_id', 'timestamp', name='uniq_student_time'),
    )
