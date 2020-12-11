const { Pool } = require('pg');
const path = require('path');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'sdc',
  port: 5432,
  // max: 20,
  // idleTimeoutMillis: 30000,
  // connectionTimeoutMillis: 2000,
});
// eslint-disable-next-line linebreak-style

pool.connect()
  .then((response) => { console.log('connected to postgres db!'); })
  .catch((err) => { console.log(err); });

module.exports = pool;