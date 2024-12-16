# api documentation

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

### get the current user

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
        "government_name": "John smith",
        "email": "john.smith@example.com",
        "user": "JohnSmith"
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

### log in a user

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

### sign up a user

creates a new user, logs them in as the current user, and returns the
current user's information.

* require authentication: false
* request
  ```http
  post /api/user
  content-type: application/json

  {
    "user":
    {
      "1":
      {
        "name": "john smith",
        "email": "john.smith@example.com",
        "user": "johnsmith",
        "password": "secret password"
      }
    }
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

### get all stations for the current user

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
        "street": "123 fake street"
        "city": "san francisco",
        "zip": "90210",
        "state": "california",
        "country": "united states of america",
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36",
      }
      "12":
      {
        "id": 12,
        "name": "bp",
        "lat": 9.4,
        "lng": -86.75,
        "street": "123 real avenue"
        "city": "san fernando",
        "zip": "90210",
        "state": "california",
        "country": "united states of america",
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36",
      }
    }
  }
  ```

## station

### get all stations

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
        "street": "123 fake street"
        "city": "San Francisco",
        "zip": "united states of america",
        "state": "california",
        "country": "united states of america",
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36",
      }
      "12":
      {
        "id": 12,
        "name": "bp",
        "lat": 9.4,
        "lng": -86.75,
        "street": "123 real avenue"
        "city": "San Fernando",
        "zip": "90210",
        "state": "california",
        "country": "united states of america",
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36",
      }
    }
  }
  ```

### get details of a station from an id

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
        "street": "123 fake street"
        "city": "san francisco",
        "zip": "united states of america",
        "state": "california",
        "country": "united states of america",
        "created": "2021-11-19 20:39:36",
        "updated": "2021-11-19 20:39:36",
      }
    }
  }

* Error response: Couldn't find a Spot with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Spot couldn't be found"
    }
    ```
