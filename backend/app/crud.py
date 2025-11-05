from sqlalchemy.orm import Session
from sqlalchemy import text
from . import models, schemas
from datetime import datetime, timedelta

# -------------------------------
# Get all payments
# -------------------------------
def get_all_payments(db: Session):
    return db.query(models.Payment).order_by(models.Payment.id).all()


# -------------------------------
# Create a new payment
# -------------------------------
def create_payment(db: Session, payment: schemas.PaymentCreate):
    db_payment = models.Payment(
        member_name=payment.member_name,
        amount=payment.amount,
        description=payment.description,
        created_at=datetime.now()  # ✅ timestamp for tracking
    )
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)

    # ✅ Recheck resequencing logic if needed
    resequence_ids(db)

    return db_payment


# -------------------------------
# Update an existing payment
# -------------------------------
def update_payment(db: Session, payment_id: int, updated: schemas.PaymentCreate):
    payment = db.query(models.Payment).filter(models.Payment.id == payment_id).first()
    if not payment:
        return None

    payment.member_name = updated.member_name
    payment.amount = updated.amount
    payment.description = updated.description
    db.commit()
    db.refresh(payment)
    return payment


# -------------------------------
# Delete a payment and resequence IDs
# -------------------------------
def delete_payment(db: Session, payment_id: int):
    payment = db.query(models.Payment).filter(models.Payment.id == payment_id).first()
    if not payment:
        return None

    db.delete(payment)
    db.commit()

    # ✅ resequence IDs (MySQL-safe)
    resequence_ids(db)

    return payment


# -------------------------------
# Resequence IDs and reset AUTO_INCREMENT
# -------------------------------
def resequence_ids(db: Session):
    """MySQL-compatible resequencing with auto_increment reset"""
    db.execute(text("SET @count = 0;"))
    db.execute(text("UPDATE payments SET id = (@count := @count + 1) ORDER BY id;"))
    db.execute(text("ALTER TABLE payments AUTO_INCREMENT = 1;"))  # ✅ reset auto increment
    db.commit()


# -------------------------------
# Get Summary Data
# -------------------------------
def get_summary(db: Session):
    payments = db.query(models.Payment).all()
    total_spending = sum(float(p.amount) for p in payments)
    seven_days_ago = datetime.now() - timedelta(days=7)
    last_7_days_spending = sum(float(p.amount) for p in payments if p.created_at and p.created_at >= seven_days_ago)
    today = datetime.now().date()
    today_spending = sum(float(p.amount) for p in payments if p.created_at and p.created_at.date() == today)

    return {
        "total_spending": total_spending,
        "last_7_days_spending": last_7_days_spending,
        "today_spending": today_spending
    }
