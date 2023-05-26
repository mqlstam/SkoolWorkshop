# SkoolWorkshop

Inventory management system for [skoolworkshop](https://skoolworkshop.nl).
Keeps track of products stored in the warehouse and shows which products are
needed for a workshop. The scrumboard of this project can be found [here.](https://scrum-aei.avans.nl:8443/secure/RapidBoard.jspa)

## Backend

The backend is written in nodejs using [express](https://expressjs.com/) and [prisma](https://www.prisma.io).
Use the following commands to create and import the database. If not using
docker edit the `.env` file to match your database settings.
```bash
$ docker run -d -e MARIADB_ALLOW_EMPTY_ROOT_PASSWORD=true -p 3306:3306 mariadb:latest
$ npx prisma db push
```

Then use the following commands to start the backend development server.
```bash
$ npm install
$ npm run serve
```

## Frontend

The frontend is created using [vue](https://vuejs.org/), [pinia](https://pinia.vuejs.org/) and [bootstrap](https://getbootstrap.com/).
Use the following commands to start the frontend development server.
```bash
$ npm install
$ npm run serve
```
