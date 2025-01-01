from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import King


def king_exists(form, field):
    # Checking if king exists
    email = field.data
    king = King.query.filter(King.email == email).first()
    if not king:
        raise ValidationError("Email provided not found.")


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data["email"]
    king = King.query.filter(King.email == email).first()
    if not king:
        raise ValidationError("No such king exists.")
    if not king.check_password(password):
        raise ValidationError("Password was incorrect.")


class LoginForm(FlaskForm):
    email = StringField(
        "email", validators=[DataRequired(), king_exists]
    )
    password = StringField(
        "password", validators=[DataRequired(), password_matches]
    )
