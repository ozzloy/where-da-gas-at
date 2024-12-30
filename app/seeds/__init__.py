from flask.cli import AppGroup

from app.seeds.price import seed_price, undo_price
from .user import seed_user, undo_user
from .station import seed_station, undo_station
from .review import seed_review, undo_review

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    seed_user()
    seed_station()
    seed_review()
    seed_price()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_review()
    undo_station()
    undo_user()
    undo_price()
    # Add other undo functions here
