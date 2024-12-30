from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField, SubmitField
from wtforms.validators import DataRequired


class ReviewForm(FlaskForm):
    station_id = IntegerField(
        "station_id", validators=[DataRequired()]
    )
    king_id = IntegerField("king_id", validators=[DataRequired()])
    text = TextAreaField("text", validators=[DataRequired()])
    submit = SubmitField("Submit")
