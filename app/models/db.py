from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.schema import MetaData

import os

environment = os.getenv("FLASK_ENV")
dialect = None
url = os.environ.get("DATABASE_URL")
if url:
    dialect = url.split("://")[0]
schema = dialect in ["postgresql"] and os.environ.get("SCHEMA")

db = SQLAlchemy(
    metadata=MetaData(naming_convention={"quoted_name": True})
)


def undo_table(table):
    sql = ""
    if schema:
        table = f"{schema}.{table}"
    if dialect in ["postgresql"]:
        sql = f"TRUNCATE {table} RESTART IDENTITY CASCADE"
    elif dialect in ["sqlite"]:
        sql = f"DELETE FROM {table}"
    else:
        raise Exception(f"unknown db dialect: {dialect}")

    db.session.execute(sql)
    db.session.commit()


# helper function for adding prefix to foreign key column references in
# production
def add_prefix_for_prod(attr):
    if schema:
        return f"{schema}.{attr}"
    else:
        return attr


class SchemaMixin:
    """mixin to add schema if it exists"""

    if schema:
        __table_args__ = {"schema": schema, "quote": True}


def drop_databases():
    with db.engine.connect() as conn:
        if schema:
            schema_tables = conn.execute(
                f"""
                    SELECT tablename FROM pg_tables
                    WHERE schemaname = '{schema}'
                """
            ).fetchall()
            for table in schema_tables:
                table_name = table[0]
                conn.execute(
                    f"""
                        DROP TABLE IF EXISTS
                            {schema}."{table_name}"
                        CASCADE
                    """
                )

        else:
            db.drop_all()


def create_databases():
    db.create_all()


def reset_databases():
    drop_databases()
    create_databases()
