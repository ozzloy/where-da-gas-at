from flask_sqlalchemy import SQLAlchemy

import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")
dialect = None
url = os.environ.get("DATABASE_URL")
if url:
    dialect = url.split("://")[0]
schema = dialect in ["postgresql"] and os.environ.get("SCHEMA")


db = SQLAlchemy()


# helper function for adding prefix to foreign key column references in
# production
def add_prefix_for_prod(attr):
    if schema:
        return f"{schema}.{attr}"
    else:
        return attr
