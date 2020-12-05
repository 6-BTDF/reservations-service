const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sdc',
  password: '',
  port: 5432,
})

var file = './cBookings.csv'

const importFile = () => {
  pool.query(`COPY herkbath.listings FROM ${file} WITH (FORMAT csv)`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}