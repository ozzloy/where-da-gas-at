from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_review():
    review1 = Review(
        user_id = 1,
        station_id = 1,
        review="Great place for premium gas, but the line can get long during rush hour."

    )
    review2 = Review(
        user_id = 1,
        station_id = 3,
        review="Love this place! The charging speed is awesome, and the restroom is always clean."
    )

    review3 = Review(
        user_id = 2,
        station_id = 2,
        review="Best fuel stop in town! The air pump works great and the staff is super friendly."
    )

    review4 = Review(
        user_id = 2,
        station_id = 1,
        review="Excellent experience! Staff is friendly, and the charging process is seamless."
    )

    review5 = Review(
        user_id = 3,
        station_id = 3,
        review=	"Charging works well, but the place is often crowded. Needs more space for parking."
    )

    review6 = Review(
        user_id = 3,
        station_id = 1,
        review="Excellent experience! Staff is friendly, and the charging process is seamless."
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)

    db.session.commit()

   

def undo_review():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.review RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM review"))

    db.session.commit()




