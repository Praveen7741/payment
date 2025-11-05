from sqlalchemy import Column, Integer, String, Float, DateTime, func
from .database import Base

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    member_name = Column(String(100))
    amount = Column(Float)
    description = Column(String(255))
    created_at = Column(DateTime, default=func.now())
