# BTDF

Reservations component for a vacation rental marketplace site

## Related Projects

  - https://github.com/6-BTDF/ImageCarousel-Service
  - https://github.com/6-BTDF/more-places-service
  - https://github.com/6-BTDF/reviews-service

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
4. [Installing Dependencies](#dependencies) 
5. [API Endpoints](#endpoints)

## Usage

- Access the individual component through
- Access the site in whole through 
- Change listings by modifying the numerical value after the site, e.g. from 

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0

## Development

## Installing Dependencies

From within the root directory:

```sh
npm install
npm run seed
npm run server
npm run build
```

## API Endpoints

API endpoints conform to a RESTful API architecture to retrieve and modify database-hosted information. All responses will include HTTP response codes to indicate status and errors and data will come in JSON pretty format. All requests must include a Content-Type of application/json and the body must be valid JSON.

**/api/listings/**
GET request for all available listings
This will return all available properties with respective fees and all booked reservation dates


**/api/listings/:id**
GET request for a single listing

This will return the property at the given ID with respective fees and all booked reservation dates

**/api/listings/:id/reservations**
POST request for a single listing



**/api/listings/:id/delete**
DELETE request for a single listing

This will delete the property and all associate information at this property ID. If there are associated reservations, they will be deleted as well.



/api/listings/:id/delete
DELETE request for a single listing



