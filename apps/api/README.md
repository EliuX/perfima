Perfima API
===============

This is an API for the Perfima project. It uses the [Nest](https://github.com/nestjs/nest) framework.

### Prerequisites

* Docker and Docker Compose v27+ installed. 
  Remember to have the Docker service running when executing the app locally.
* NodeJS v20+ installed.
* Yarn is used as package manager, but not necessary.

## Project setup
   
   Install the dependencies

   ```bash
   $ yarn install
   ```

## How to demo

1. Start MongoDB

   ```bash
   $ docker-compose up -d   
   ```
   By default, docker-compose will use the environment variables in  './.env', but if 
   you want to another set, you can do it with:

   ```bash
   $ docker-compose --env-file path/to/another.env up -d
   ```

2. Run the API locally
    
   ```bash 
   $ yarn start
   ```
    
   Open your browser and navigate to http://localhost:8080/.

   > You can change the port with the env variable `PORT`, which by default is `3000`. I personally set it to `8080` or 
   > `3001` so it won't conflict with the webapp.

### Authenticate

For authenticating using the credentials of an existing user you must use the following
command:

```bash
$ curl -X POST http://localhost:3000/auth/login -d '{"username": "6763819045fff580d4e42ffc", "password": "stringst"}' -H "Content-Type: application/json"
{"access_token":"jwt has here...."}
```

### Postman

You can import into Postman the collection exported as _[Perfima API.postman_collection.json](Perfima%20API.postman_collection.json)_
located in the docs folder. Use it to ease the manual testing of the API.


## Run tests

   ```bash
   $ yarn run test 
   ```

### Required services

In this project we are going to use [MongoDB Community Edition](https://www.mongodb.com/docs/manual/administration/install-community/).
This and any other required services to try in development mode shall be available via the docker-compose configuration 
in this project.



