from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Review

# establish a blueprint for review routes
review_routes = Blueprint("reviews", __name__)


# Create a review
# @review_routes.route('/')
# @login_required