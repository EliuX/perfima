# Perfima Project

Welcome to the **Perfima Project**, a full-stack application designed to manage personal finance accounts. This 
repository contains two main subprojects:

1. **[API](./api/README.md)**: A backend built using [NestJS](https://nestjs.com/), which provides robust APIs for 
   managing financial data.
2. **[Webapp](./webapp/README.md)**: A frontend built using [ReactJS](https://reactjs.org/) to deliver an intuitive 
   user interface.


## Tech Stack
### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [Yarn](https://yarnpkg.com/) preferred package manager for NodeJS.
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
 
#### Others already included
- **Monorepo Tool**: Lerna (Nx inside)
- **Containerization**: Docker and Docker compose

### Backend (API)
- **Framework**: NestJS
- **Database**: MongoDB
- **ORM**: TypeORM

### Frontend (Webapp)
- **Framework**: ReactJS/NextJS


### Installation

1. Clone the repository:
   ```bash
   $ git clone git@github.com:EliuX/perfima.git 
   $ cd perfima
   ```

2. Install dependencies in all the subprojects of the monorepo and link them (bootstrap):

    ```bash
   $ yarn install
   ``` 
   This process should scan all packages, install the dependencies and resolve version conflicts.

### Running the Applications
This is an starting point for executing these applications, but for more information
check their respective README.md files.

#### API (Backend)
1. Navigate to the API folder:

    ```bash
    $ cd apps/api
    ``` 
   
2. Copy the .env.template to the real .env file:

    ```bash
    $ cp .env.template .env
    ``` 
   
    Fill it with the right variables

3. Start the required services (database):

    ```bash
    $ docker-compose up -d
    ``` 

4. Start the API in development mode:

    ```bash
    $ yarn start:dev
    ```
   
    Access the API at http://localhost:3000. 

    > Remember the port is defined by the env variable `PORT`

### Webapp (Frontend)

1. Navigate to the Webapp folder:

    ```bash
    $ cd apps/webapp
    ``` 

2. Start the development server:

    ```bash
    $ yarn start
    ```
   
   Access the Webapp at http://localhost:3001.


## License

This project is licensed under the terms of the MIT license
