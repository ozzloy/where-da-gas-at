# setup

## configure the venv and pipenv
create the file `pyrightconfig.json` from `example.pyrightconfig.json`
```bash
cd backend
pipenv install
pipenv --venv
# output will look like:
# /home/ozzloy/.local/share/virtualenvs/backend-NQ-ykkAT
cp example.pyrightconfig.json pyrightconfig.json
```

open `pyrightconfig.json` and modify the content using the output of
`pipenv --venv`.

## configure postgres

### install postgres

### create a user and db for this app

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

### helpful tips

```sql
\l -- see existing dbs
\c where_da_gas_at -- connect to db
SET search_path TO where_da_gas_at; -- set schema
\dt -- list tables

-- "user" needs to be in quotes.  psql reserves 'user' sans quotes
select * from "user";
```

## run
```bash
cd backend
pipenv run flask run
```
