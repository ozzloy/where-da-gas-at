from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Station


def validate_station(_form, field):
    station = Station.query.filter(
        Station.location_id == field.data
    ).first()
    if station:
        raise ValidationError("Station already exists.")


class StationForm(FlaskForm):
    address = StringField("address", validators=[DataRequired()])
    lat = StringField("lat", validators=[DataRequired()])
    lng = StringField("lng", validators=[DataRequired()])
    location_id = StringField(
        "location_id", validators=[DataRequired(), validate_station]
    )
    name = StringField("name", validators=[DataRequired()])
    uri = StringField("uri", validators=[DataRequired()])
    king_id = StringField("king_id", validators=[DataRequired()])


class EditStationForm(FlaskForm):
    address = StringField("address", validators=[DataRequired()])
    lat = StringField("lat", validators=[DataRequired()])
    lng = StringField("lng", validators=[DataRequired()])
    location_id = StringField(
        "location_id", validators=[DataRequired()]
    )
    name = StringField("name", validators=[DataRequired()])
    uri = StringField("uri", validators=[DataRequired()])
    king_id = StringField("king_id", validators=[DataRequired()])
