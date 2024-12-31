#! /usr/bin/env bash

sudo -u postgres psql -q -f reset-db-postgres.sql
rm -rf migrations
pipenv run flask db init
pipenv run flask db migrate -m "this is going to get erased anyways"
pipenv run flask db upgrade
pipenv run flask seed all
