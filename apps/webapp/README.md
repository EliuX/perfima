Perfima Webapp
===============

This is a [Next.js](https://nextjs.org/) project with [Material UI](https://github.com/mui/material-ui) installed.

## Project setup

```bash
$ yarn install
``` 

## Run the project

The following command compiles and runs the app in the development mode:

```bash
$ yarn dev
``` 

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Building and Running
Build the project image locally or during the CI/CD.

```bash
docker build -t perfima-webapp .
```

Run it in a docker container

```bash
docker run -d -p 3000:3000 perfima-webapp
```
