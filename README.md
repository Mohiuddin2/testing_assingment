# Node.js recruitment task

Have built a simple Movie API. It has two endpoints as said:

1. `POST /movies`
   1. Allows creating a movie object based on movie title passed in the request body
   2. Based on the title additional movie details is fetched from
      https://omdbapi.com/ and saved to the mongodb. Data is fetched from OMDb API as 
      bellow:
   ```
     Title: string
     Released: date
     Genre: string
     Director: string
   ```
   3. Only authorized users can create a movie.
   4. `Basic` users are restricted to create 5 movies per month (calendar
      month). `Premium` users have no limits.
   5. Indivisual user can't save same movie twice. But both uesr can save same movie once. 
1. `GET /movies`
   1. Only authorized user can fetch respective users movie info(Basic Uesr 5 Move).

User authentication is verifed with user's authorization token before processing the
request. The token is passed in request's `Authorization` header as Bearer Token.

```
Authorization: Bearer <token>
```

# Authorization service

To authorize users the auth service( JWT tokens) are used which was provieded by the Netguru Authority.


## Prerequisites if Followd as bellow:

 `docker` and `docker-compose` installed on my computer to run the service.

## Run locally

1. Clone this repository
2. Run from root dir
3. Jwt secret is added docker-compose.yml file in the root directory Not in Github Secret for testing convenient issue.

```
Buld docker image with this cli: docker-compose up --buld
```

By default the auth service will start on port `3000` but you can override
the default value by setting the `APP_PORT` env var

The docker iamge can be run with following cli the shell
```
Running Background: docker-compose up -d 
Running in shell: docker-compose up 
```

To stop the authorization service run

```
docker-compose down
```

## JWT Secret

To get the all Functionality Please see the Postman Documentation Pdf file in this repo or Visit https://documenter.getpostman.com/view/14579877/UVsEWpLp


## Users

The auth service defines two user accounts that you should use

1. `Basic` user

```
 username: 'basic-thomas'
 password: 'sR-_pcoow-27-6PAwCD8'
```

1. `Premium` user

```
username: 'premium-jim'
password: 'GBLtTyq3E_UNjFnpo9m6'
```

## Token payload

Decoding the auth token will give you access to basic information about the
user, including its role.

```
{
  "userId": 123,
  "name": "Basic Thomas",
  "role": "basic",
  "iat": 1606221838, // Will vary time to time
  "exp": 1606223638, // Will vary time to time
  "iss": "https://www.netguru.com/",
  "sub": "123"
}
```

## Example request

To authorize user call the auth service using for example `curl`. We assume
that the auth service is running of the default port `3000`.

Request

```
curl --location --request POST '0.0.0.0:3000/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "basic-thomas",
    "password": "sR-_pcoow-27-6PAwCD8"
}'
```

Response

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob2GUiOiJiYXNpYyIsImlhdCI6MTYwNjIyMTgzOCwiZXhwIjoxNjA2MjIzNjM4LCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.KjZ3zZM1lZa1SB8U-W65oQApSiC70ePdkQ7LbAhpUQg"
}  
// Will vary with each req.
```

## Rules Maintained 

- Mongodb is used as Database 
- API is dockerized. 
- This solution contains of two microservices as follows:
  - `Authentication Service` - provided by us to auth users
  - `Movies Service` - created by you to handle movies data
  - 
- Tested All functionality and most of the security matters with testing differet kind of attempt. All kind of errors are handled.
- 
- API documentation is attached or Please Visit https://documenter.getpostman.com/view/14579877/UVsEWpLp for documentation.
- Codes are Working on CI/CD pipeline. To be honest "npm test" command in the node.js.yml is removed. Becaues, I have 
  started github action very recently. Within a short time it will be very familiar to me. Please consider this.


"Have a Nice Day"
