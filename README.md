[![Netlify Status](https://api.netlify.com/api/v1/badges/914f5bff-f4c3-43ef-88ab-7b79b75110e2/deploy-status)](https://app.netlify.com/sites/oakland-services/deploys) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/tehkaiyu/oakland-services/issues)

# Oakland Services

> A USDR project

## Directory Layout

```
├── /src                         # ReactJS client, which contains most of our UI
│   ├── /components              # React components, reusable across all pages
│   ├── /features                # App routes and feature specific code
│   ├── /styles                  # Global theme definitions
│   └── /utils                   # Client side helper functions/Utilities/Services
└── /public                      # Static assets
```

## Setting up

This app is bootrapped with [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)

## Backend

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
knex migrate:latest
```

### Run Seed

```
knex seed:run
```