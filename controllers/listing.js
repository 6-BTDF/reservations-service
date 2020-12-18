/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
/* eslint-disable linebreak-style */
const pool = require('../db/models.js');

// get for single listing
function getListing(req, res) {
  pool.connect()
    .then(client => {
      return client
        .query(`select u.username, l.*, JSON_agg(json_build_object('check_in', b.check_in, 'check_out', b.check_out)) AS reserved from herkbath.listings l LEFT JOIN herkbath.bookings b ON l.listings_id = b.id_listings INNER JOIN herkbath.users u ON l.owner = u.users_id WHERE l.listings_id = ${req.params.id} group by l.listings_id, u.username`)
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
function addListing(req, res) {
  const keys = Object.keys(req.body);
  const vals = `'${Object.values(req.body).join("','")}'`;

  pool.connect()
    .then(client => {
      return client
        .query(`INSERT INTO herkbath.listings (${keys}) VALUES (${vals})`)
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

// patch for single listing
function modifyListing(req, res) {
  const keys = Object.keys(req.body);

  pool.connect()
    .then(client => {
      return client
        .query(`UPDATE herkbath.listings SET (${keys}) = (SELECT ${keys} FROM json_populate_record (NULL::herkbath.listings, '${JSON.stringify(req.body)}')) WHERE listings_id = ${req.params.id}`)
        .then(results => {
          client.release();
          res.header('Content-Type', 'application/json');
          res.status(204);
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
function deleteListing(req, res) {
  pool.connect()
    .then(client => {
      return client
        .query(`DELETE FROM herkbath.listings WHERE listings_id = ${req.params.id}`)
        .then(results => {
          client.release();
          res.header('Content-Type', 'application/json');
          res.status(204);
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
  getListing,
  addListing,
  modifyListing,
  deleteListing,
};
