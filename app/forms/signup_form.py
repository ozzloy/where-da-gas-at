from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(_form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email address is already in use.")


def nickname_exists(_form, field):
    # Checking if nickname is already in use
    nickname = field.data
    user = User.query.filter(User.nick == nickname).first()
    if user:
        raise ValidationError("Nickname is already in use.")


class SignUpForm(FlaskForm):
    nick = StringField(
        "nick", validators=[DataRequired(), nickname_exists]
    )
    email = StringField(
        "email", validators=[DataRequired(), user_exists]
    )
    password = StringField("password", validators=[DataRequired()])
