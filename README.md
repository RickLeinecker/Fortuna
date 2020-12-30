# Running locally

## 1. After starting docker, go to the fortuna root folder
## 2. Ensure that you have the appropriate .env file in each folder
## 3. Add COMPOSE_PROJECT_NAME=fortunabackend at the top of the .env for the backend
## 4. Add COMPOSE_PROJECT_NAME=fortunafrontend at the top of the .env for the frontend

## 5. type the following:

###       docker-compose up --build

###       once it appears, ctrl+click localhost:3000 in the terminal

###       make sure that you can log in with your local account

## 6. To stop containers from running, press ctrl+c in terminal.
##    If this does not work, open a new terminal and type the following
###           docker-compose stop
## 7. When installing new npm packages, you will need to type the following
###     docker-compose down -v