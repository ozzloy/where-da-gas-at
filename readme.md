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

\c where_da_gas_at -- switch to newly created db
--You are now connected to database "where_da_gas_at" as user "postgres".

CREATE SCHEMA where_da_gas_at;

GRANT USAGE, CREATE ON SCHEMA where_da_gas_at TO where_da_gas_at;
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

### frontend

```bash
cd where-da-gas-at/react-vite
npm i
npm run preview
```

## deploy

TODO fill out these commands

```bash
cd react-vite
npm run build
```
