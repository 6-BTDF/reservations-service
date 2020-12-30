/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
/* eslint-disable linebreak-style */
const pool = require('../db/models.js');

// get specific reservation
function getReservation(req, res) {
  pool.connect()
    .then(client => {
      return client
        .query(`SELECT * FROM herkbath.bookings WHERE bookings_id = ${req.params.id}`)
        .then(results => {
          client.release();
          res.header('Content-Type', 'application/json');
          res.status(200);
          res.send(JSON.stringify(results.rows[0], 0, 2));
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
          res.send(500);
          // eslint-disable-next-line semi
        })
    });
}

// add for single listing
function makeReservation(req, res) {
  const keys = Object.keys(req.body);
  const vals = `'${Object.values(req.body).join("','")}'`;

  pool.connect()
    .then(client => {
      return client
        .query(`INSERT INTO herkbath.bookings (${keys}) VALUES (${vals})`)
        .then(results => {
          client.release();
          res.header('Content-Type', 'application/json');
          res.status(200);
          res.send(JSON.stringify(results.rows[0], 0, 2));
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
          res.send(500);
          // eslint-disable-next-line semi
        })
    });
}

// delete for single listing
function deleteReservation(req, res) {

  pool.connect()
    .then(client => {
      return client
        .query(`DELETE FROM herkbath.bookings WHERE bookings_id = ${req.body.bookings_id}`)
        .then(results => {
          client.release();
          res.header('Content-Type', 'application/json');
          res.status(200);
          res.send(JSON.stringify(results.rows[0], 0, 2));
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
          res.send(500);
          // eslint-disable-next-line semi
        })
    });
}

module.exports = {
  getReservation,
  makeReservation,
  deleteReservation,
};
