# Oakland Services

> A USDR project

## Directory Layout

```
├── /src                         # ReactJS client, which contains most of our UI
│   ├── /components              # React components, reusable across all pages
│   ├── /features                # App routes and feature specific code
│   ├── /styles                  # Global theme definitions
│   └── /utils                   # Client side helper functions/Utilities/Services
├── /server                      # Express backend
├── /db                          # Postgres db
└── /public                      # Static assets
```

## Setting up

```
npm i
npm run dev
```

### Create DB

```
psql -h localhost -U postgres
```

```
CREATE DATABASE oakland_services_dev;
CREATE DATABASE oakland_services_test;
```

### Migrate

```
npm run db:migrate
```

### Run Seed

```
npm run db:seed
```

## Deployment

Anything merged into master will automatically be deployed on render

## Notes

The client app is bootrapped with [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
