# where da gas at?

## run

### start the backend

install the requirements

```bash
cd where-da-gas-at
pipenv install -r requirements.txt
```

create pyrightconfig.json and put the right content in it

```bash
pipenv --venv | xargs dirname
# /home/ozzloy/.local/share/virtualenvs

pipenv --venv | xargs basename
# where-da-gas-at-U7Wdii6-

cp example.pyrightconfig.json pyrightconfig.json
# modify the content to have the right content venv value
# venvPath should be the output of
#   pipenv --venv | xargs dirname
# and
# venv should be the output of
#   pipenv --venv | xargs basename
```

create .env

```bash

cp example.env .env
```

make sure its contents look right.

#### install postgres

#### postgres: create a user and db for this app

```bash
sudo -u postgres psql
```

```sql
CREATE USER where_da_gas_at WITH PASSWORD 'where da gas at?';
-- response: CREATE ROLE

CREATE DATABASE where_da_gas_at OWNER where_da_gas_at;
-- response: CREATE DATABASE

GRANT ALL PRIVILEGES ON DATABASE where_da_gas_at TO where_da_gas_at;
-- response: GRANT

-- switch to newly created db
\c where_da_gas_at
--You are now connected to database "where_da_gas_at" as user "postgres".

CREATE SCHEMA where_da_gas_at;

GRANT USAGE, CREATE
  ON SCHEMA where_da_gas_at
  TO where_da_gas_at;
-- GRANT

GRANT
  ALL PRIVILEGES
  ON ALL TABLES
  IN SCHEMA where_da_gas_at
  TO where_da_gas_at;
-- GRANT

\q
-- exit psql session
```

#### helpful psql tips

```sql
\l -- see existing dbs
\c where_da_gas_at -- connect to db
SET search_path TO where_da_gas_at; -- set schema
\dt -- list tables

-- "user" needs to be in quotes.  psql reserves 'user' sans quotes
select * from "user";
```

#### run the backend

```bash
# on new project creation,
pipenv run flask db init

# on every schema change
pipenv run flask db migrate -m "describe schema change"

pipenv run flask db upgrade
pipenv run flask seed all
pipenv run flask run
```

#### reset the backend

this will delete all the tables and re-add them

```bash
pipenv run flask db-drop-all
pipenv run flask db upgrade
```

and you can then reseed with

```bash
pipenv run flask seed all
```

### start the frontend

```bash
cd where-da-gas-at/react-vite
npm i
npm run preview
```

## test

### test the backend

```bash
cd where-da-gas-at
pipenv run pytest
```

should produce output like this:

```
========================== test session starts =====================
platform linux -- Python 3.12.3, pytest-7.4.4, pluggy-1.4.0
rootdir: /home/ozzloy/app-academy/src/where-da-gas-at
collected 1 item

tests/api/test_auth_routes.py .                              [100%]

=========================== 1 passed in 0.14s ======================
```

## deploy

TODO fill out these commands

```bash
cd react-vite
npm run build
```
