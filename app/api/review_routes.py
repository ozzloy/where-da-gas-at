from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from ..models import db, Review
from ..forms import ReviewForm

# establish a blueprint for review routes
review_routes = Blueprint("review", __name__)


# #Create Review
@review_routes.route("/", methods=["POST"])
@jwt_required()
def create_review():
    king_id = int(get_jwt_identity())
    created_form = ReviewForm()
    created_form["king_id"].data = king_id
    if created_form.validate():
        station_id = created_form.data.get("station_id")
        text = created_form.data.get("text")
        errors = {}
        if not text:
            errors["text"] = "text is required"
        if not station_id:
            errors["station_id"] = "station id is required"
        if 0 < len(errors):
            return (
                {
                    "message": "bad request",
                    "error": errors,
                },
                400,
            )

        review = Review(
            station_id=station_id,
            king_id=king_id,
            text=text,
        )

        db.session.add(review)
        db.session.commit()

        return {"review": {str(review.id): review.to_dict()}}, 200

    return created_form.errors, 401


# Read one review
@review_routes.route("/<int:review_id>", methods=["GET"])
def read_review(review_id):
    try:
        review = Review.query.filter(Review.id == review_id).first()

        # failure
        if not review:
            return {"error": f"review {review.id} not found"}, 404

        return {"review": {str(review.id): review.to_dict()}}, 200

    except Exception as e:
        return {"error": str(e)}, 500


# Read All Review
@review_routes.route("/", methods=["GET"])
def read_reviews():
    try:
        reviews = Review.query.all()
        return {
            "review": {
                str(review.id): review.to_dict() for review in reviews
            }
        }, 200

    except Exception as e:
        return {"error": str(e)}, 500


# Edit a review(require king login)
@review_routes.route("/<int:review_id>", methods=["PUT"])
@jwt_required()
def update_review(review_id):
    king_id = int(get_jwt_identity())
    try:
        updated_form = ReviewForm()
        updated_form["king_id"].data = king_id

        review = Review.query.get(review_id)
        if not review:
            return {
                "message": f"review {review_id} couldn't be found"
            }, 404
        if not updated_form.validate():
            return updated_form.errors, 400

        if not review.king_id == king_id:
            return {"error": {"message": "Unauthorized"}}, 401

        review.station_id = updated_form.data["station_id"]
        review.text = updated_form.data["text"]

        # change to the database
        db.session.commit()

        # success
        return {"review": {str(review.id): review.to_dict()}}, 200

    except Exception as e:
        return {"error": str(e)}, 500


# Delete a review(require king login)
@review_routes.route("/<int:review_id>", methods=["DELETE"])
@jwt_required()
def deleted_review(review_id):
    king_id = int(get_jwt_identity())
    try:
        review = Review.query.filter(Review.id == review_id).one()

        # unathorized
        if not king_id == review.king_id:
            return {"error": {"message": "Unauthorized"}}, 401

        # failure
        if not review:
            return {"error": f"review {review.id} is not found"}

        db.session.delete(review)
        db.session.commit()

        # success
        return {
            "message": f"deleted review {review.id} successfully",
        }, 200

    except Exception as e:
        return {"error": str(e)}, 500
