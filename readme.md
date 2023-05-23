# REST API example application

## [notes about the test](https://asary.notion.site/AgriG8-Croppal-e892652d78d04e78981ce3e2224e828e)

API Docs can be found in `rest_api_docs_insomnia.json`

API endpoint is at https://crop.asary.me/api/farm

Tested on:

- node 19.8.2 (Alpine docker)
- Postgres 14.8

## Run Locally

    populate the .env
    > npm ci
    > npm run migrate
    > npm run dev
