from flask import Flask
from .config import Config

app = Flask(__name__)
print(__name__)

app.config.from_object(Config)


@app.route('/')
def index():
    return 'Where da gas at'
