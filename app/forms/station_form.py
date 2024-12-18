from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Station

def validate_station(form, field):
    station = Station.query.filter(Station.location_id == field.data).first()
    if station:
        raise ValidationError("Station already exists.")

class StationForm(FlaskForm): 
    name = StringField("name", validators=[DataRequired()])
    city = StringField("city", validators=[DataRequired()])
    state = StringField("state", validators=[DataRequired()])
    country = StringField("country", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    image = StringField("image", validators=[DataRequired()])
    latitude = StringField("latitude", validators=[DataRequired()])
    longitude = StringField("longitude", validators=[DataRequired()])
    location_id = StringField("location_id", validators=[DataRequired(), validate_station])
    user_id = StringField("user_id", validators=[DataRequired()])