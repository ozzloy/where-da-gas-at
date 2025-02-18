from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Station


class StationForm(FlaskForm):
    class Meta:
        csrf = False

    id = StringField("id", validators=[DataRequired()])
    address = StringField("address", validators=[DataRequired()])
    lat = StringField("lat", validators=[DataRequired()])
    lng = StringField("lng", validators=[DataRequired()])
    name = StringField("name", validators=[DataRequired()])
    uri = StringField("uri", validators=[DataRequired()])


class EditStationForm(FlaskForm):
    class Meta:
        csrf = False

    id = StringField("id", validators=[DataRequired()])
    address = StringField("address", validators=[DataRequired()])
    lat = StringField("lat", validators=[DataRequired()])
    lng = StringField("lng", validators=[DataRequired()])
    name = StringField("name", validators=[DataRequired()])
    uri = StringField("uri", validators=[DataRequired()])
