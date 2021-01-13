# Herkshire Bathaway

Reservations component for a vacation rental marketplace site

## Related Projects

  - https://git.io/JtvFB
  - https://git.io/JtvF0
  - https://git.io/JtvFu

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
4. [Installing Dependencies](#installing-dependencies) 
5. [API Endpoints](#api-endpoints)

## Usage

- Access the individual component through client/src/index.js
- Change listings by modifying the numerical value after the site, e.g. from 

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0

## Development

Developed using Babel webpack and Node.js. To start a development bundle and server, run:

```sh
npm run build
npm run start
```

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


<h3>Listings Routes</h3>
------------------------

**`GET` /api/listings/:listingid**
• This endpoint retrieves information for a house listing
• `GET` request for a single listing id
• Success status code: `200`
• Request parameter of `:listingid` from API endpoint will be accepted. No request object is required.
• Response is a JSON object that contains property at the given ID with respective fees and all booked reservation dates
• Response object will be a valid JSON object as below:
```sh
{ owner: String, 
  listings_name: String, 
  dailyPrice: Number, 
  cleaningFee: Number, 
  serviceFee: Number, 
  taxes: Number, 
  max_guests: Number, 
  min_stay: Number, 
  max_stay: Number, 
  monthlyDiscount: Number, 
  weeklyDiscount: Number, 
  holidayPremium: Number, 
  weekendPremium: Number, 
  reserved: [{check-in: ISO Date, check out: ISO Date}]
 }
 ```

**`POST` /api/listings/newListing**
• This endpoint allows you to create a new listing for a house
• `POST` request for a single listing
• Success status code: `201`
• Required request fields: owner, listings_name
• Optional request fields: dailyPrice, cleaningFee and other parameters. These are still highly recommended. Default values will be assigned to the other objects but this may not be the desired charges.
• Request object must be a valid JSON object  with two required parameters and any number of the below optional parameters:
```sh
{ owner: Integer, 
  listings_name: String 
  [dailyPrice: Number, 
  cleaningFee: Number, 
  serviceFee: Number, 
  taxes: Number, 
  max_guests: Number, 
  min_stay: Number, 
  max_stay: Number, 
  monthlyDiscount: Number, 
  weeklyDiscount: Number, 
  holidayPremium: Number, 
  weekendPremium: Number]
}
```

**`PATCH` /api/listings/:listingid/updateListing**
• This endpoint allows you to modify a listing for any number of fields in a listing object (excluding listing ID)
• `PATCH` request for a single listing
• Success status code: `204`
• Listing ID does not need to be included (it will be retrieved from the URL path). Any number of parameters below can be changed
• Request object must be a valid JSON object with any of the below optional parameters:
```sh
{  owner: Integer, 
   listings_name: String, 
   dailyPrice: Number, 
   cleaningFee: Number, 
   serviceFee: Number, 
   taxes: Number, 
   max_guests: Number, 
   min_stay: Number, 
   max_stay: Number, 
   monthlyDiscount: Number, 
   weeklyDiscount: Number, 
   holidayPremium: Number, 
   weekendPremium: Number
 }
```

**`DELETE` /api/listings/:listingid/deleteListing**
• This will delete the listing and all associated information for listing's reservations
• `DELETE` request for a single reservation
• Success status code: `204`
• Request parameter of `:listingid` from API endpoint will be accepted. No request object is required.




<h3>Reservations Routes</h3>
------------------------

**`GET` /api/listings/:listingid/getReservations**
• This endpoint allows you to retrieve all reservations for a specific listing
• `GET` request for all reservations for a particular listingid
• Success status code: `200`
• Request parameter of `:listingid` from API endpoint will be accepted. No request object is required.
• Response will be a JSON object that contains reservation information as below:
```sh
{ bookings_id: Number, 
  check_in: ISO string, 
  check_out: ISO string, 
  total_price: Number, 
  adults: Number, 
  children: NUmber, 
  infants: Number, 
  listings_name: String, 
  owner: String
 }
 ```

**`POST` /api/listings/:listingid/makeReservation**
• This endpoint allows you to create a reservation for specified dates, number of adults/children
• `POST` request for a single reservation
• Success status code: `201`
• Request field will be accepted as required fields of checkin/checkout data, id_users with optional paramters below
  •`:listingId` will be retrieved from URL path
```sh
{ checkin: date, 
  checkout: date, 
  id_users: Number, 
  [ id: listingId, 
  adults: Number, 
  children: Number, 
  infants: Number ]
 }
 ```

**DELETE /api/listings/:listingid/deleteReservation**
• This endpoint will delete the reservation and all associated information at this reservation number
• `DELETE` request for a single reservation
• Success status code: `204`
• Request field will be accepted as a valid JSON object of 
```sh
{ reservation: reservationNumber }
```




