const { Pool } = require('pg');

// eslint-disable-next-line linebreak-style

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'sdc',
  password: '',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});


pool.on('err', (err, client) => {
  console.error('unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
