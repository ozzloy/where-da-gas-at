from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import db, Review
from ..forms import ReviewForm

# establish a blueprint for review routes
review_routes = Blueprint("review", __name__)

# #Create Review
# @review_routes.route('/', method=['POST'])
# def created_review()


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
                str(review.id): review.to_dict() for reviwe in reviews
            }
        }, 200

    except Exception as e:
        return {"error": str(e)}, 500


# Edit a review(require user login)
@review_routes.route("/<int:review_id>", methods=["PUT"])
@login_required
def update_review(review_id):
    try:
        updated_form = ReviewForm()
        updated_form["csrf_token"].data = request.cookies[
            "csrf_token"
        ]

        if updated_form.validate_on_submit():
            review = Review.query.filter(
                Review.id == review_id
            ).first()

        # failure
        if not review:
            return (
                jsonify(
                    {
                        "message": "bad request",
                        "error": {
                            "review": "review is required",
                            "station_id": "station id is required",
                            "user_id": f"{review.id}",
                        },
                    }
                ),
                400,
            )

        # unathorized
        if not current_user.id == review.user_id:
            return {"error": {"message": "Unauthorized"}}, 401

        review.user_id = updated_form.data["user_id"]
        review.station_id = updated_form.data["station_id"]
        review.review = updated_form.data["review"]

        # change to the database
        db.session.commit()

        # success
        return jsonify(review.to_dict()), 200

    except Exception as e:
        return {"error": str(e)}, 500


# Delete a review(require user login)
@review_routes.route("/<int:review_id>", methods=["DELETE"])
@login_required
def deleted_review(review_id):
    try:
        review = Review.query.filter(Review.id == review_id).one()

        # unathorized
        if not current_user.id == review.user_id:
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
