# Weatherapp

Solution to the [Weatherapp](https://github.com/Eficode/weatherapp) task, described in the [`INSTRUCTIONS.md`](INSTRUCTIONS.md) file.


## Authentication

The application uses an API key from the [openweathermap](http://openweathermap.org/) service.

Once obtained, the API key must be placed in a file with the name `.env` in the `backend` folder. The file must look like this:

    APPID=<api-key>
    
Replace the contents of the angle brackets (and the brackets themselves) with the API key.

## Running the application

### Install dependencies

The dependencies are installed with

    npm i

### CLI

The application can be started from the command 

    npm start

This should be done in the same directory as the `package.json` file is.

### Docker

The `backend` and `frontend` directories contain each a Dockerfile which can be used to run the application inside a Docker container.

The backend docker container is started with the following:

    docker build -t weatherapp_backend . && docker run --rm -i -p 9000:9000 --name weatherapp_backend -t weatherapp_backend

The frontend docker container is started with:

    docker build -t weatherapp_frontend . && docker run --rm -i -p 9000:9000 --name weatherapp_frontend -t weatherapp_frontend

Each Dockerfile should be executed inside the respective directory.

### Docker-compose

Both the backend and the frontend can be started with the `docker-compose.yml` script. The script is run with

    docker-compose up

in the directory where the `docker-compose.yml` file is located.

