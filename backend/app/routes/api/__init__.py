from flask import Blueprint

from app.routes.api.user import user

api = Blueprint("api", __name__, url_prefix="/api")
api.register_blueprint(user)
