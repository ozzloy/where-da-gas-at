from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField, SubmitField
from wtforms.validators import DataRequired


class ReviewForm(FlaskForm):
    station_id = IntegerField(
        "station_id", validators=[DataRequired()]
    )
    user_id = IntegerField("user_id", validators=[DataRequired()])
    review = TextAreaField("review", validators=[DataRequired()])
    sumbit = SubmitField("Submit")
