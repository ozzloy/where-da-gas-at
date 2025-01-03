from flask import Blueprint, request
from flask_login import (
    current_user as current_king,
    login_user as login_king,
    logout_user as logout_king,
    login_required,
)

from app.forms import LoginForm, SignUpForm
from app.models import db, King

auth_routes = Blueprint("auth", __name__)


@auth_routes.route("/")
def authenticate():
    """
    Authenticates a king.
    """
    if current_king.is_authenticated:
        return current_king.to_dict()
    return {"errors": {"message": "Unauthorized"}}, 401


@auth_routes.route("/login", methods=["POST"])
def login():
    """
    Logs a king in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form["csrf_token"].data = request.cookies["csrf_token"]

    if not form.validate_on_submit():
        return form.errors, 401

    # Add the king to the session, we are logged in!
    king = King.query.filter(King.email == form.data["email"]).first()
    login_king(king)
    return king.to_dict()


@auth_routes.route("/logout")
def logout():
    """
    Logs a king out
    """
    logout_king()
    return {"message": "King logged out"}


@auth_routes.route("/signup", methods=["POST"])
def sign_up():
    """
    Creates a new king and logs them in
    """
    form = SignUpForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        print('b')
        king = King(
            nick=form.data["nick"],
            email=form.data["email"],
            password=form.data["password"],
            name=form.data["name"]
        )
        db.session.add(king)
        db.session.commit()
        login_king(king)
        return {"king": {king.id: king.to_dict()}}
    print(f"what does show", form.errors)
    return form.errors, 401


@auth_routes.route("/unauthorized")
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {"errors": {"message": "Unauthorized"}}, 401
