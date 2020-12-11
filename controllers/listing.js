/* eslint-disable linebreak-style */
const pool = require('../db/models.js');

// get for single listing
function getListing(req, res) {
  pool.query(`select u.username, l.*, JSON_agg(json_build_object('check_in', b.check_in, 'check_out', b.check_out)) AS reserved from herkbath.listings l INNER JOIN herkbath.bookings b ON l.listings_id = b.id_listings INNER JOIN herkbath.users u ON l.owner = u.users_id WHERE l.listings_id = ${req.params.id} group by l.listings_id, u.username`, (err, listings) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.header('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(listings.rows[0], 0, 2));
    }
  });
}

// add for single listing
function addListing(req, res) {
  let fields = '';
  let values = '';
  let keys = Object.keys(req.body);
  let vals = Object.values(req.body);
  for (let i = 0; i < keys.length; i++) {
    fields += keys[i];
    if (isNaN(vals[i])) {
      values += `'${vals[i]}'`;
    } else {
      values += vals[i];
    }
    if (i < keys.length - 1) {
      fields += ',';
      values += ',';
    }
  }

  pool.query(`INSERT INTO herkbath.listings (${fields}) VALUES (${values})`, (err, listings) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.header('Content-Type', 'application/json');
      res.status(201);
      res.send(JSON.stringify(listings, 0, 2));
    }
  });
}

// patch for single listing
function modifyListing(req, res) {
  pool.query(`UPDATE herkbath.listings SET ${req.params} = ${req.params.field} WHERE listings_id = ${req.params.id}`, (err, listings) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.header('Content-Type', 'application/json');
      res.status(204);
      res.send(JSON.stringify(listings, 0, 2));
    }
  });
}

// delete for single listing
function deleteListing(req, res) {
  pool.query(`DELETE FROM herkbath.listings WHERE listings_id = ${req.params.id}`, (err, listings) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.header('Content-Type', 'application/json');
      res.sendStatus(204);
    }
  });
}

module.exports = {
  getListing,
  addListing,
  modifyListing,
  deleteListing,
};
