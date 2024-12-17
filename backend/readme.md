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

\q
-- exit psql session
```

## run
```bash
cd backend
pipenv run flask run
```
