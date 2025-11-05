from pydantic import BaseModel

class PaymentBase(BaseModel):
    member_name: str
    amount: float
    description: str

class PaymentCreate(PaymentBase):
    pass

class Payment(PaymentBase):
    id: int

    class Config:
        from_attributes = True
