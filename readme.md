# where da gas at?

## run

### backend

```bash
pipenv install -r requirements.txt
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

once `pyrightconfig.json` is created with the right contents,

```bash

cp example.env .env
```

make sure its contents look right.

### configure postgres

#### install postgres

#### create a user and db for this app

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

## run
```bash
cd backend
pipenv run flask run
```




   <!-- ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ``` -->