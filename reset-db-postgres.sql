DROP DATABASE IF EXISTS where_da_gas_at;

CREATE DATABASE where_da_gas_at OWNER where_da_gas_at;
-- response: CREATE DATABASE

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
