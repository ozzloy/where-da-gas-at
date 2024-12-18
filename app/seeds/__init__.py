from flask.cli import AppGroup
from .user import seed_user, undo_user
from .station import seed_station, undo_station
from .review import seed_review, undo_review

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    if environment == "production":
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_review()
        undo_station()
        undo_user()
    seed_user()
    seed_station()
    seed_review()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_review()
    undo_station()
    undo_user()
    # Add other undo functions here
