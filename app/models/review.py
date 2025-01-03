from .db import add_prefix_for_prod, db, environment, SchemaMixin
from .king import King


class Review(db.Model, SchemaMixin):
    __tablename__ = "review"

    id = db.Column(db.Integer, primary_key=True)
    king_id = db.Column(
        db.Integer,
        db.ForeignKey(
            add_prefix_for_prod("king.id"), ondelete="CASCADE"
        ),
        nullable=False,
    )
    station_id = db.Column(
        db.String,
        db.ForeignKey(
            add_prefix_for_prod("station.id"), ondelete="CASCADE"
        ),
        nullable=False,
    )
    text = db.Column(db.Text, nullable=False)

    def to_dict(self):
        king = King.query.get(self.king_id)
        
        return {
            "id": self.id,
            "king_id": self.king_id,
            "king_name": king.name,
            "station_id": self.station_id,
            "text": self.text,
        }
