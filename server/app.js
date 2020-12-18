/* eslint-disable no-console */
const express = require('express');
const path = require('path');
// const morgan = require('morgan');
const listings = require('../controllers/listing.js');
const res = require('../controllers/reservations.js');

const app = express();

// app.use(morgan('dev'));
app.use(express.json());
// app.use('/api/listings/:id', express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use('/houses/:id', express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use('/', (req, res) => { res.send(''); });

app.get('/api/houses/:id', listings.getListing);
app.post('/api/houses/:id/newListing', listings.addListing);
app.patch('/api/houses/:id/updateListing', listings.modifyListing);
app.delete('/api/houses/:id/deleteListing', listings.deleteListing);
app.get('/api/houses/:id/getReservations', res.getReservation);
app.post('/api/houses/:id/makeReservation', res.makeReservation);
app.delete('/api/houses/:id/deleteReservation', res.deleteReservation);

module.exports = app;
