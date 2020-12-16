/* eslint-disable no-console */
const express = require('express');
const path = require('path');
// const morgan = require('morgan');
const listings = require('../controllers/listing.js')
const res = require('../controllers/reservations.js')

const app = express();

// app.use(morgan('dev'));
app.use(express.json());
// app.use('/api/listings/:id', express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use('/listings/:id', express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use('/loaderio-2bf39656ece22ae9da1c2fbb1b8f4ba6/', express.static(path.join(__dirname, '..', 'client', 'dist', 'loaderio-2bf39656ece22ae9da1c2fbb1b8f4ba6.txt')))

app.get('/api/listings/:id', listings.getListing);
app.post('/api/listings/:id/newListing', listings.addListing);
app.patch('/api/listings/:id/updateListing', listings.modifyListing);
app.delete('/api/listings/:id/deleteListing', listings.deleteListing);
app.get('/api/listings/:id/getReservations', res.getReservation);
app.post('/api/listings/:id/makeReservation', res.makeReservation);
app.delete('/api/listings/:id/deleteReservation', res.deleteReservation);

module.exports = app;
