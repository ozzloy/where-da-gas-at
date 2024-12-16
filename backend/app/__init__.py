from flask import Flask

from app.config import Config
from app.routes.api import api

app = Flask(__name__)
print(__name__)

app.config.from_object(Config)
app.register_blueprint(api)
