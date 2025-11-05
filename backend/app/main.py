from fastapi import FastAPI, HTTPException ,Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import SessionLocal, engine, get_db
from . import models, schemas, crud, database

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can replace with ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=database.engine)

@app.get("/")
def root():
    return {"message": "Payments Tracker API running successfully"}

@app.get("/payments")
def get_payments():
    db = database.SessionLocal()
    payments = crud.get_all_payments(db)
    db.close()
    return payments

@app.post("/payments")
def add_payment(payment: schemas.PaymentCreate):
    db = database.SessionLocal()
    new_payment = crud.create_payment(db, payment)
    db.close()
    return new_payment

@app.put("/payments/{payment_id}")
def update_payment(payment_id: int, updated: schemas.PaymentCreate):
    db = database.SessionLocal()
    result = crud.update_payment(db, payment_id, updated)
    db.close()
    if not result:
        raise HTTPException(status_code=404, detail="Payment not found")
    return result

@app.delete("/payments/{payment_id}")
def delete_payment(payment_id: int):
    db = database.SessionLocal()
    deleted = crud.delete_payment(db, payment_id)
    db.close()
    if not deleted:
        raise HTTPException(status_code=404, detail="Payment not found")
    return {"message": "Payment deleted successfully"}

@app.get("/summary", response_model=None)
def get_summary(db: Session = Depends(get_db)):
    return crud.get_summary(db)

