## Prerequisites

### Yarn:

- Installation: : https://yarnpkg.com/lang/en/docs/install.

### Nodejs:

- Nodejs version >= 10.13.0, except for v13, must be installed.
- Installation: https://nodejs.org/en/.

### Postgresql Setup:

- Installation: https://www.postgresql.org/download/.
- [Necessary enviroment variables](#Postgresql) for database connection.

### Docker & Docker-Compose Setup:

- Docker installation: https://docs.docker.com/get-docker/.
- Docker-compose installation: https://docs.docker.com/compose/install/.

## Getting Started

```
# 1. Clone the repository.
git clone https://github.com/m3ntorship/backend-nestjs-template.git my-new-project

# You can also use "Use this template" button to create new repository from this remplate.

# 2. If you decided to clone, enter your folder.
cd my-new-project

# 3. Install dependencies.
yarn

# 4. Run development server and open http://localhost:3000
yarn start:dev
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Debug

#### Use vscode integrated debug mode to run the following commands in debug mode:

```bash
- yarn start:dev
- yarn start
- yarn start:prod
- yarn test
- yarn test:e2e
```

## Configurations

We use Postgresql, you can install it here: https://www.postgresql.org/download/.<br/>
If you are comfortable with Docker, skip to [Docker](#Docker) section and use Postgresql image.

### Necessary Environment Variables

### Postgresql

- If you are using local Postgresql server, fill `.development.env` file with the following configurations:

```
DB_HOST =
DB_PORT =
DB_USERNAME =
DB_PASSWORD =
DB_DATABASE =
DB_ENTITIES =
```

If any of the preceding properties were not filled in `.development.env` file, the following values are made

```
DB_HOST = localhost
DB_PORT = 5432
DB_USERNAME = postgres
DB_PASSWORD = postgres
DB_DATABASE = postgresql_database
DB_ENTITIES = "dist/**/*.entity.{ts,js}"
```

### Services URL's

- Also, add other services URL's

```
POSTS_SERVICE_URL = http://localhost:3000
UPLOAD_SERVICE_URL = http://localhost:3001
```

## Use Docker to start the application

- You need to [install docker](#docker-&-docker-compose-setup) and docker-compose to start the database

- Open terminal and navigate to project directory and run the following command

  - `$ yarn`
  - `$ yarn build`
  - `$ docker build -t microservice-template .`
  - `$ docker-compose up -d`

- Now the database is ready to be used using:
  ```bash
  port = 5432
  host = localhost
  username = postgres
  database = postgres
  password = postgres
  ```

## Template Components

- Logging
  - Request Logger
  - Exception Logger
- Tests
- Configuration
- Modules
  - [Clients Module](#Clients-Module)
  - [Example Module](#Example-Module)

### Clients Module:

- Module for all other services API endpoints.

### Example Module

- A typical module to be replaced with the actual module(s). It includes database implementation.
