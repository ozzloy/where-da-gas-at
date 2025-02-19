from flask import Blueprint, request
from flask_jwt_extended import create_access_token

from app.forms import LoginForm, SignUpForm
from app.models import db, King

auth_routes = Blueprint("auth", __name__)


@auth_routes.route("/login", methods=["POST"])
def login():
    """
    Logs a king in
    """
    form = LoginForm()

    if not form.validate():
        return form.errors, 401

    # Add the king to the session, we are logged in!
    king = King.query.filter(King.email == form.data["email"]).first()
    access_token = create_access_token(identity=str(king.id))
    return {"token": access_token, "king": king.to_dict()}


@auth_routes.route("/signup", methods=["POST"])
def sign_up():
    """
    Creates a new king and logs them in
    """
    form = SignUpForm()

    if form.validate():
        king = King(
            nick=form.data["nick"],
            email=form.data["email"],
            password=form.data["password"],
            name=form.data["name"],
        )
        db.session.add(king)
        db.session.commit()
        login_king(king)
        return {"king": {king.id: king.to_dict()}}
    return form.errors, 401


@auth_routes.route("/unauthorized")
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {"errors": {"message": "Unauthorized"}}, 401
