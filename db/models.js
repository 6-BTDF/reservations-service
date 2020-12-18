const { Client, Pool } = require('pg');
const path = require('path');

const client = new Client({
  host: '',
  user: 'ec2-user',
  database: 'sdc',
  password: '',
  port: 5432,
  // max: 20,
  // idleTimeoutMillis: 30000,
  // connectionTimeoutMillis: 2000,
});
// eslint-disable-next-line linebreak-style

const pool = new Pool({
  host: '',
  user: 'ec2-user',
  database: 'sdc',
  password: '',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

client.connect()
  .then((response) => { console.log('connected to postgres db for client!'); })
  .catch((err) => { console.log(err); });

pool.connect()
  .then((response) => { console.log('connected to postgres db for pool!'); })
  .catch((err) => { console.log(err); });

module.exports = client;
module.exports = pool;
