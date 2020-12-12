# Ailpup

Reservations component for a vacation rental marketplace site
<div align="center">
  <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/WholeSite.png" height="450">
</div>
<div align="center">
  <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/CalendarComponent.png" height="275">
  <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/FeesComponent.png" height="275">
  <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/GuestsComponent.png" height="275">
</div>

## Related Projects

  - https://github.com/spicy-boiz/photo-carousel-service
  - https://github.com/spicy-boiz/places-to-stay-service
  - https://github.com/spicy-boiz/reviews-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

- Access the individual component through http://18.217.62.125:3002/listings/5/
- Access the site in whole through http://3.20.233.115:3000/5/
- Change listings by modifying the numerical value after the site, e.g. from http://3.20.233.115:3000/5/ to http://3.20.233.115:3000/10/

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
npm run seed
npm run server
npm run build
