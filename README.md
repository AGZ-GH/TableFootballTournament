# Table Football Tournament Manager


Hello and welcome to this small showcase project. 
This project aim at making a web applications allowing to handle tournament for table football 

## Tools / Framework / Dependencies used 

This project feature various dependencies such as:

### Backend:

* express : to build a Rest API
* Mysql : Database
* typeorm : ORM
* Json Web Token: for JWT token generation
* Bcryptjs : Password Encryption
* Swagger aut : Auto generate swagger documentation
* Swagger Ui Express : generate the HTML for swagger
* Zod : Data v  alidations

### Frontend:

* Vue
* Vite

## Installing and using the project

### With docker:

#### Requirements:

In order to launch the project with docker you'll need both [docker](https://docs.docker.com/engine/install/) and [docker compose](https://docs.docker.com/compose/install/) installed

#### Starting up:

you will need to add a .env at the root of the project with those values:

```shell
#BACKEND 
BACKEND_DOCKER_PORT = [["Port you wish to use for the express backend"]]
BACKEND_HOST = "[[Hostname for the back]]"

#Vue
FRONTEND_PORT = "[[Port you wish to use for the frontend]]"

#DATABASE
DATABASE_NAME = "[[Name of the database]]"
DATABASE_PORT  = "[[Port you want to use for the database]]"
DATABASE_HOST  = "localhost" // might need to use "172.17.0.1" instead
DATABASE_USERNAME  = "[[Database username]"
DATABASE_PWD  = "[[Your password here]]"

#JWT
JWT_SECRET = "[[Any secret string you wish to use for JWT]]"
```

once done simply run in the project folder

```
docker compose build
```

followed up by 

```
docker compose up
```

and that's it your app is up and running

/!\ Mysql docker can be a bit slow the first time, so if you've got a error connect on your first launch just exit and relaunch *docker compose up*

Another approach would be to the alone the Mysql docker first by using the command: 

```
docker compose up -d mysqldb
```

/!\ Mysql has it's own storage so in order to add or change the database user you will have to either drop it (*docker compose down -v* **THIS WILL DELETE THE DATABSE**) or manually connect with *docker exec -it [docker id] mysql -u[user] -p* to the running docker to manually do it


### Locally:

To run locally without the usage of docker you will need a few extra steps.

#### Requirements:
You will need to install Mysql locally on your machine along side [NodeJS](https://nodejs.org/en/download) in order for the project to run.

I recommand the usage of Database tool such as Dbeaver or any of your liking 

Both the front end and the backend support dotenv and will need environement variables so either put all the keys described below in your environnements or create .env files inside /backend and /frontend

The keys are :

**backend**

```shell
BACKEND_DOCKER_PORT="[[Port you want to use for the back end]]"
DATABASE_NAME="[[Name for your database]]"
DATABASE_PORT="[[Database port (default for mysql is 3306)]]"
DATABASE_HOST="localhost"
DATABASE_USERNAME="[[Username used for your database]]"
DATABASE_PWD="[[Password for the database]]"
JWT_SECRET="[[Secret you wish to use]]"
```

**frontend**
 
 ```shell
 VITE_BACKEND_HOST="localhost"
 VITE_BACKEND_DOCKER_PORT="[[Port you used for the backend]]"
 ```

 to run the backend simply run inside of /backend
 
 ```
npm run start
```

for the frontend run inside of /frontend

```
npm run dev
```

### In addition 
You won't have an administrator user at the start and you will have to signin and update the value *isAdmin* directely in your database to have one.


It's probably advice to do so as they are the only ones capable of creating tournament and updating matches

You can access the swagger doc via localhost:[API REST PORT]/api-docs