/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const Helpers = require('../db/models.js');
const controllers = require('../controllers/index.js')

const app = express();

app.use(morgan('dev'));
app.use('/', express.json());
app.use('/listings/:id', express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('/api/listings/', controllers.getAllListings);

app.get('/api/listings/:id', controllers.getSpecificListing);

module.exports = app;
