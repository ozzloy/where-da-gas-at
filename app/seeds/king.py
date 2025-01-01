from app.models import db, King, undo_table

demo_email = "demo@example.com"
king_seeds = [
    {
        "nick": "demo",
        "email": demo_email,
        "password": "password",
    },
    {
        "nick": "marnie",
        "email": "marnie@example.com",
        "password": "password",
    },
    {
        "nick": "bobbie",
        "email": "bobbie@example.com",
        "password": "password",
    },
]

emails = [king["email"] for king in king_seeds]


# Adds a demo king, you can add other kings here if you want
def seed_king():
    # use the "kings" array to insert records into the db
    for king_seed in king_seeds:
        king = King(
            nick=king_seed["nick"],
            email=king_seed["email"],
            password=king_seed["password"],
        )
        db.session.add(king)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the king table.
# SQLAlchemy doesn't have a built in function to do this. With
# postgres in production TRUNCATE removes all the data from the table,
# and RESET IDENTITY resets the auto incrementing primary key, CASCADE
# deletes any dependent entities. With sqlite3 in development you need
# to instead use DELETE to remove all data and it will reset the
# primary keys for you as well
def undo_king():
    undo_table("king")
