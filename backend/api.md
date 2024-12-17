# api documentation

![db diagram](db.png)

## general format of all response body values
```json
{
  "slice, aka table":
  {
    "id":
    {
      "key": "values",
      "for": "object, aka record"
    }
  }
}
```

## user authentication/authorization

### all endpoints that require authentication

all endpoints that require a current user to be logged in.

* request: endpoints that require authentication
* error response:
  ```http
  http/1.1 401 unauthorized
  content-type: application/json

  {
        "message": "authentication required"
  }
  ```

### all endpoints that require proper authorization

all endpoints that require authentication and the current user does
not have the correct role(s) or permission(s).

* response:
  ```http
  http/1.1 403 forbidden
  content-type: application/json

  {"message":"forbidden"}
  ```

## endpoints

### user

#### get the current user

returns the information about the current user that is logged in.

* require authentication: false
* request
  ```http
  get /api/user/current
  ```

* successful response when there is a logged in user
  ```http
  http/1.1 200 ok
  content-type: application/json

  {
    "user":
    {
      "1":
      {
        "id": 1,
        "name": "john smith",
        "email": "john.smith@example.com",
        "user": "johnsmith"
      }
    }
  }
  ```

* successful response when there is no logged in user
  ```http
  http/1.1 200 ok
  content-type: application/json

  {
    "user": null
  }
  ```

#### log in a user

logs in a current user with valid credentials and returns the current
user's information.

* require authentication: false
* request
  ```http
  post /api/session
  content-type: application/json

  {
    "credential": "john.smith@gmail.com",
    "password": "secret password"
  }
  ```

* successful response
  ```http
  http/1.1 200 ok
  content-type: application/json

  {
    "user":
    {
      "1":
      {
        "id": 1,
        "name": "john smith",
        "email": "john.smith@example.com",
        "user": "johnsmith"
      }
    }
  }
  ```

* error response: invalid credentials
  ```http
  http/1.1 401 unauthorized
  content-type: application/json

  {
    "message": "invalid credentials"
  }
  ```

* error response: body validation errors
  ```http
  http/1.1 400 bad request
  content-type: application/json

  {
    "message": "bad request",
    "errors":
    {
      "credential": "email or username is required",
      "password": "password is required"
    }
  }
  ```

#### sign up a user

creates a new user, logs them in as the current user, and returns the
current user's information.

* require authentication: false
* request
  ```http
  post /api/user
  content-type: application/json

  {
    "name": "john smith",
    "email": "john.smith@example.com",
    "user": "johnsmith",
    "password": "secret password"
  }
  ```

* successful response
  ```http
  http/1.1 201 created
  content-type: application/json

  {
    "user":
    {
      "1":
      {
        "id": 1,
        "name": "john smith",
        "email": "john.smith@example.com",
        "user": "johnsmith"
      }
    }
  }
  ```

* error response: user already exists with the specified email or
  username
  ```http
  http/1.1 500 internal server error
  content-type: application/json

  {
    "message": "user already exists",
    "errors": {
      "email": "user with that email already exists",
      "user": "account with that username already exists"
    }
  }
  ```

#### update a user

update an extant user, and returns the current user's information.

* require authentication: true
* request
  ```http
  put /api/user
  content-type: application/json

  {
    "name": "john smith",
    "email": "john.smith2@example.com",
    "user": "johnsmith2",
    "password": "secret password2"
  }
  ```

* successful response

  ```http
  http/1.1 200 ok
  content-type: application/json

  {
    "user":
    {
      "1":
      {
        "id": 1,
        "name": "john smith",
        "email": "john.smith2@example.com",
        "user": "johnsmith2"
      }
    }
  }
  ```

* error response: user already exists with the specified email or
  username

  ```http
  http/1.1 500 internal server error
  content-type: application/json

  {
    "message": "user already exists",
    "errors": {
      "email": "user with that email already exists",
      "user": "account with that username already exists"
    }
  }
  ```

* error response: body validation errors
  ```http
  http/1.1 400 bad request
  content-type: application/json

  {
    "message": "bad request",
    "errors": {
      "email": "invalid email",
      "user": "username is required",
      "name": "name is required",
    }
  }
  ```

#### delete a user
* require authentication: true
* request
  ```http
  delete /api/user/1
  ```
* success:
  ```http
  http/1.1 200 ok

  {
    "message": "deleted user 1 successfully"
  }
  ```
* failure:
  ```http
  http/1.1 404

  {
    "error": "user 1 not found"
  }
  ```
#### get all stations for the current user

returns all the stations owned (created) by the current user.

* require authentication: true
* request
  ```http
  get /api/user/current/station
  ```

* example successful response
  ```http
  http/1.1 200 ok
  content-type: application/json

  {
    "station":
    {
      "1":
      {
        "id": 1,
        "name": "arco",
        "lat": 37.7645358,
        "lng": -122.4730327,
        "address": "123 fake street, beverly hills, 90210, ca, usa",
        "uri": "some google maps uri thing, idk",
        "location_id": "some google maps location id, idk",
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36"
      },
      "12":
      {
        "id": 12,
        "name": "bp",
        "lat": 9.4,
        "lng": -86.75,
        "address": "456 real street, beverly mountains, 90211, ca, usa",
        "uri": "some google maps uri thing, idk",
        "location_id": "some google maps location id, idk",
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36"
      }
    }
  }
  ```

#### get all reviews for current user
returns all the reviews owned (created) by the current user.

* require authentication: true
* request
  ```http
  get /api/user/current/review
  ```

* example successful response
  ```http
  http/1.1 200 ok
  content-type: application/json

  {
    "review":
    {
      "1":
      {
        "id": 1,
        "review": "wow, what a great station"
        "station_id": 2,
        "user_id": 1,
        "created": "2021-11-19 20:39:36",
        "updated": "2023-11-19 20:39:36"
      },
      "12":
      {
        "id": 12,
        "review": "wow, what a great station"
        "station_id": 2,
        "user_id": 1,
        "created": "2021-11-19 20:39:36",
        "updated": "2023-11-19 20:39:36"
      },
    }
  }
  ```

#### get all prices for current user

returns all prices for the current user

* requires authentication: true

* request

  ```http
  get /api/user/1/price
  ```

* success

  ```http
  http/1.1 ok
  content-type: application/json

  {
    "price":
    {
      "1":
      {
        "id": 1,
        "price": 456.789,
        "station_id": 1,
        "user_id": 1,
        "fuel_type": "one of: electric, unleaded, leaded, or premium",
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36"
      },
      "12":
      {
        "id": 12,
        "price": 132.45
        "station_id": 1,
        "user_id": 1,
        "fuel_type": "one of: electric, unleaded, leaded, or premium",
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36"
      }
    }
  }
  ```

### station

#### get all stations

* require authentication: false

* request

  ```http
  get /api/station
  ```

* successful response

  ```http
  http/1.1 200 ok
  content-type: application/json

  {
    "station":
    {
      "1":
      {
        "id": 1,
        "name": "arco",
        "lat": 37.7645358,
        "lng": -122.4730327,
        "address": "123 fake street, beverly hills, 90210, ca, usa",
        "uri": "some google maps uri thing, idk",
        "location_id": "some google maps location id, idk",
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36"
      }
      "12":
      {
        "id": 12,
        "name": "bp",
        "lat": 9.4,
        "lng": -86.75,
        "address": "456 real street, beverly mountains, 90211, ca, usa",
        "uri": "some google maps uri thing, idk",
        "location_id": "some google maps location id, idk",
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36"
      }
    }
  }
  ```

#### get details of a station from an id

returns the details of a spot specified by its id.

* require authentication: false

* request

  ```http
  get /api/station/:station_id
  ```

* successful response

  ```http
  http/1.1 200 ok
  content-type: application/json

  {
    "station":
    {
      "1":
      {
        "id": 1,
        "name": "arco",
        "lat": 37.7645358,
        "lng": -122.4730327,
        "address": "123 fake street, beverly hills, 90210, ca, usa",
        "uri": "some google maps uri thing, idk",
        "location_id": "some google maps location id, idk",
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36"
      }
    }
  }

* error response: couldn't find a station with the specified id

  ```http
  http/1.1 404

  {
    "message": "station 1 couldn't be found"
  }
  ```

#### save a station by creating a station record

* require authentication: true

* request

  ```http
  post /api/station
  content-type: application/json

  {
    "name": "arco",
    "lat": 37.7645358,
    "lng": -122.4730327,
    "address": "123 fake street, beverly hills, 90210, ca, usa",
    "uri": "some google maps uri thing, idk",
    "location_id": "some google maps location id, idk"
  }
  ```

* success response

  ```http
  http/1.1 201 created
  content-type: application/json

  {
    "station":
    {
      "1":
      {
        "id": 1,
        "name": "arco",
        "lat": 37.7645358,
        "lng": -122.4730327,
        "address": "123 updated street, beverly hills, 90210, ca, usa",
        "uri": "some google maps uri thing, idk",
        "location_id": "some google maps location id, idk",
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36"
      }
    }
  }
  ```

* error response: body validation errors

  ```http
  http/1.1 400 bad request
  content-type: application/json

  {
    "message": "bad request",
    "errors": {
      "lat": "-90 <= lat <= 90",
      "lng": "-180 <= lng <= 180",
      "address": "address is required",
      "uri": "uri is required",
      "location_id": "location_id is required"
    }
  }
  ```


#### update a station

* require authentication: true

* request

  ```http
  put /api/station
  content-type: application/json

  {
    "name": "new arco",
    "lat": 37.7645358,
    "lng": -122.4730327,
    "address": "123 updated street, beverly hills, 90210, ca, usa",
    "uri": "some google maps uri thing, idk",
    "location_id": "some google maps location id, idk"
  }
  ```

* success response
  ```http
  http/1.1 201 created
  content-type: application/json

  {
    "station":
    {
      "1":
      {
        "id": 1,
        "name": "new arco",
        "lat": 37.7645358,
        "lng": -122.4730327,
        "address": "123 updated street, beverly hills, 90210, ca, usa",
        "uri": "some google maps uri thing, idk",
        "location_id": "some google maps location id, idk",
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36"
      }
    }
  }
  ```

* error response: body validation errors

  ```http
  http/1.1 400 bad request
  content-type: application/json

  {
    "message": "bad request",
    "errors": {
      "lat": "-90 <= lat <= 90",
      "lng": "-180 <= lng <= 180",
      "address": "address is required",
      "uri": "uri is required",
      "location_id": "location_id is required"
    }
  }
  ```

#### delete a station

* require authentication: true

* request

  ```http
  delete /api/station/1
  ```

* success:

  ```http
  http/1.1 200 ok
  content-type: application/json

  {
    "message": "deleted station 1 successfully"
  }
  ```

* failure:

  ```http
  http/1.1 404
  content-type: application/json

  {
    "error": "station 1 not found"
  }
  ```

#### get all reviews for station
returns all the reviews owned (created) by the station.

* require authentication: true
* request
  ```http
  get /api/station/1/review
  ```

* example successful response
  ```http
  http/1.1 200 ok
  content-type: application/json

  {
    "review":
    {
      "1":
      {
        "id": 1,
        "review": "wow, what a great station"
        "station_id": 1,
        "user_id": 1,
        "created": "2021-11-19 20:39:36",
        "updated": "2023-11-19 20:39:36"
      },
      "12":
      {
        "id": 12,
        "review": "wow, what a great station"
        "station_id": 1,
        "user_id": 1,
        "created": "2021-11-19 20:39:36",
        "updated": "2023-11-19 20:39:36"
      },
    }
  }
  ```

#### get all prices for station

returns all prices for the station

* requires authentication: true

* request

  ```http
  get /api/station/1/price
  ```

* success

  ```http
  http/1.1 ok
  content-type: application/json

  {
    "price":
    {
      "1":
      {
        "id": 1,
        "price": 456.789,
        "user_id": 1,
        "station_id": 1,
        "fuel_type": "one of: electric, unleaded, leaded, or premium",
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36"
      },
      "12":
      {
        "id": 12,
        "price": 132.45
        "user_id": 1,
        "station_id": 1,
        "fuel_type": "one of: electric, unleaded, leaded, or premium",
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36"
      }
    }
  }
  ```

### price

#### create

* require authentication: true

* request

  ```http
  post /api/price
  content-type: application/json

  {
    "price": 456.789,
    "user_id": 1,
    "station_id": 1,
    "fuel_type": "one of: electric, unleaded, leaded, or premium"
  }
  ```

* success:

  ```http
  http/1.1 200 ok
  content-type: application/json

  {
    "price":
    {
      "1":
      {
        "id": 1,
        "price": 456.789,
        "user_id": 1,
        "station_id": 1,
        "fuel_type": "one of: electric, unleaded, leaded, or premium",
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36"
      }
    }
  }
  ```

* failure:

  ```http
  http/1.1 400 bad request
  {
    "message": "bad request",
    "errors":
    {
      "price": "price is required",
      "user_id": "user id is required",
      "station_id": "station id is required",
      "fuel_type": "fuel type is required"
    }
  }
  ```

#### read

* require authentication: false

* request:

  ```
  get /api/price/1
  ```

* success:

  ```http
  http/1.1 200 ok
  content-type: application/json

  {
    "price":
    {
      "1":
      {
        "id": 1,
        "price": 456.789,
        "user_id": 1,
        "station_id": 1,
        "fuel_type": "one of: electric, unleaded, leaded, or premium",
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36"
      }
    }
  }
  ```

* failure:

  ```http
  http/1.1 404

  {
    "error": "price 1 not found"
  }
  ```

#### read all

* require authentication: false

* request:

  ```
  get /api/price
  ```

* success:

  ```http
  http/1.1 200 ok
  content-type: application/json

  {
    "price":
    {
      "1":
      {
        "id": 1,
        "price": 456.789,
        "user_id": 1,
        "station_id": 1,
        "fuel_type": "one of: electric, unleaded, leaded, or premium",
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36"
      }
      "2":
      {
        "id": 2,
        "price": 123.456,
        "user_id": 1,
        "station_id": 1,
        "fuel_type": "one of: electric, unleaded, leaded, or premium",
        "created": "2022-11-19 20:39:36",
        "updated": "2022-11-19 20:39:36"
      }
    }
  }
  ```

#### update

* require authentication: true

* request

  ```http
  post /api/price/1
  content-type: application/json

  {
    "price": 666.49,
    "station_id": 2,
    "fuel_type": "one of: electric, unleaded, leaded, or premium"
  }
  ```

* success:

  ```http
  http/1.1 200 ok
  content-type: application/json

  {
    "price":
    {
      "1":
      {
        "id": 1,
        "price": 666.49
        "user_id": 1,
        "station_id": 2,
        "fuel_type": "one of: electric, unleaded, leaded, or premium",
        "created": "2021-11-19 20:39:36",
        "updated": "2023-11-19 20:39:36"
      }
    }
  }
  ```

* failure:

  ```http
  http/1.1 400 bad request
  {
    "message": "bad request",
    "errors":
    {
      "price": "price is required",
      "user_id": "user id is required",
      "station_id": "station id is required",
      "fuel_type": "fuel type is required"
    }
  }
  ```

#### delete

* require authentication: true

* request

  ```http
  delete /api/price/1
  ```

* success:

  ```http
  http/1.1 200 ok

  {
    "message": "deleted price 1 successfully"
  }
  ```

* failure:

  ```http
  http/1.1 404

  {
    "error": "price 1 not found"
  }
  ```

### review

#### create

* require authentication: true

* request

  ```http
  post /api/review
  content-type: application/json

  {
    "review": "very nice gas station",
    "station_id": 1,
    "user_id": 1
  }
  ```

* success:

  ```http
  http/1.1 200 ok
  content-type: application/json

  {
    "review":
    {
      "1":
      {
        "id": 1,
        "review": 456.789,
        "station_id": 1,
        "user_id": 1,
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36"
      }
    }
  }
  ```

* failure:

  ```http
  http/1.1 400 bad request
  {
    "message": "bad request",
    "errors":
    {
      "review": "review is required",
      "station_id": "station id is required",
      "user_id": "user id is required"
    }
  }
  ```

#### read

* require authentication: false

* request:

  ```
  get /api/review/1
  ```

* success:

  ```http
  http/1.1 200 ok
  content-type: application/json

  {
    "review":
    {
      "1":
      {
        "id": 1,
        "review": 456.789,
        "station_id": 1,
        "user_id": 1,
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36"
      }
    }
  }
  ```

* failure:

  ```http
  http/1.1 404

  {
    "error": "review 1 not found"
  }
  ```

#### read all

* require authentication: false

* request:

  ```
  get /api/review
  ```

* success:

  ```http
  http/1.1 200 ok
  content-type: application/json

  {
    "review":
    {
      "1":
      {
        "id": 1,
        "review": 456.789,
        "station_id": 1,
        "user_id": 1,
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36"
      }
      "2":
      {
        "id": 2,
        "review": 123.456,
        "station_id": 1,
        "user_id": 1,
        "created": "2022-11-19 20:39:36",
        "updated": "2022-11-19 20:39:36"
      }
    }
  }
  ```

#### update

* require authentication: true

* request

  ```http
  post /api/review/1
  content-type: application/json

  {
    "review": 666.49,
    "station_id": 2,
    "user_id": 1
  }
  ```

* success:

  ```http
  http/1.1 200 ok
  content-type: application/json

  {
    "review":
    {
      "1":
      {
        "id": 1,
        "review": "wow, what a great station"
        "station_id": 2,
        "user_id": 1,
        "created": "2021-11-19 20:39:36",
        "updated": "2023-11-19 20:39:36"
      }
    }
  }
  ```

* failure:

  ```http
  http/1.1 400 bad request
  {
    "message": "bad request",
    "errors":
    {
      "review": "review is required",
      "station_id": "station id is required",
      "user_id": 1
    }
  }
  ```

#### delete

* require authentication: true

* request

  ```http
  delete /api/review/1
  ```

* success:

  ```http
  http/1.1 200 ok

  {
    "message": "deleted review 1 successfully"
  }
  ```

* failure:

  ```http
  http/1.1 404

  {
    "error": "review 1 not found"
  }
  ```
