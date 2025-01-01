from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import King


def king_exists(_form, field):
    # Checking if king exists
    email = field.data
    king = King.query.filter(King.email == email).first()
    if king:
        raise ValidationError("Email address is already in use.")


def nickname_exists(_form, field):
    # Checking if nickname is already in use
    nickname = field.data
    king = King.query.filter(King.nick == nickname).first()
    if king:
        raise ValidationError("Nickname is already in use.")


class SignUpForm(FlaskForm):
    nick = StringField(
        "nick", validators=[DataRequired(), nickname_exists]
    )
    email = StringField(
        "email", validators=[DataRequired(), king_exists]
    )
    password = StringField("password", validators=[DataRequired()])
