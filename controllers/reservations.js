/* eslint-disable linebreak-style */
const pool = require('../db/models.js');

// get specific reservation
function getReservation(req, res) {
  pool.query(`SELECT * FROM herkbath.bookings WHERE bookings_id = ${req.params.id}`, (err, listings) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.header('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(listings, 0, 2));
    }
  });
}

// add for single listing
function makeReservation(req, res) {
  const keys = Object.keys(req.body);
  const vals = `'${Object.values(req.body).join("','")}'`;

  pool.query(`INSERT INTO herkbath.bookings (${keys}) VALUES (${vals})`, (err, listings) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.header('Content-Type', 'application/json');
      res.status(201);
      res.send(JSON.stringify(listings, 0, 2));
    }
  });
}

// delete for single listing
function deleteReservation(req, res) {
  pool.query(`DELETE FROM herkbath.bookings WHERE bookings_id = ${req.body.bookings_id}`, (err, listings) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.header('Content-Type', 'application/json');
      res.sendStatus(204);
    }
  });
}

module.exports = {
  getReservation,
  makeReservation,
  deleteReservation,
};
