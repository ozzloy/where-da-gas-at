#! /usr/bin/env bash

# Exit immediately if any command returns non-zero status
set -o errexit

# Exit if any command in a pipeline fails (not just the last one)
set -o pipefail

# Error on undefined variables
set -o nounset

# Print commands before executing (useful for debugging)
set -o xtrace

sudo -u postgres psql -q -f reset-db-postgres.sql
rm -rf migrations
pipenv run flask db init
pipenv run flask db migrate -m "this is going to get erased anyways"
pipenv run flask db upgrade
pipenv run flask seed all
