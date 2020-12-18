/* eslint-disable linebreak-style */
const client = require('../db/models.js');

// get for single listing
function getListing(req, res) {
  client.query(`select u.username, l.*, JSON_agg(json_build_object('check_in', b.check_in, 'check_out', b.check_out)) AS reserved from herkbath.listings l LEFT JOIN herkbath.bookings b ON l.listings_id = b.id_listings INNER JOIN herkbath.users u ON l.owner = u.users_id WHERE l.listings_id = ${req.params.id} group by l.listings_id, u.username`, (err, listings) => {
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
  const keys = Object.keys(req.body);
  const vals = `'${Object.values(req.body).join("','")}'`;

  client.query(`INSERT INTO herkbath.listings (${keys}) VALUES (${vals})`, (err, listings) => {
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
  const keys = Object.keys(req.body);

  client.query(`UPDATE herkbath.listings SET (${keys}) = (SELECT ${keys} FROM json_populate_record (NULL::herkbath.listings, '${JSON.stringify(req.body)}')) WHERE listings_id = ${req.params.id}`, (err, listings) => {
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
  client.query(`DELETE FROM herkbath.listings WHERE listings_id = ${req.params.id}`, (err, listings) => {
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
