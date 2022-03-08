# Node.js recruitment task

Have built a simple Movie API. It two endpoints:

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
3. Jwt secret is added docker-compose.yml file in the root directory.

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

To generate tokens in auth service you need to provide env variable
`JWT_SECRET`. It should be a string value. You should use the same secret in
the API you're building to verify the JWT tokens.

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
  "iat": 1606221838,
  "exp": 1606223638,
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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTYwNjIyMTgzOCwiZXhwIjoxNjA2MjIzNjM4LCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.KjZ3zZM1lZa1SB8U-W65oQApSiC70ePdkQ7LbAhpUQg"
}
```

## Rules

- Database and framework choice are on your side.
- Your API has to be dockerized. Create `Dockerfile` and `docker-compose` and document the process of running it locally.
- Provided solution should consist of two microservices.
  - `Authentication Service` - provided by us to auth users
  - `Movies Service` - created by you to handle movies data
- Test your code.
- Provide documentation of your API.
- Application should be pushed to the public git repository and should have a
  working CI/CD pipeline that runs the tests. For example you can use GitHub
  Actions or CircleCI. Create a sample PR to show us the working CI/CD pipeline.

## What will be evaluated?

- Task completeness
- Architecture
- Code quality
- Tests quality
- Database design
- Technology stack
