const { Client } = require('pg')
const path = require('path')
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  database: 'sdc',
  port: 5432
})

client.connect()
  .then((response)=> {console.log('connected to db!')})
  .catch((err)=> {console.log(err)})

var bookings = path.join(__dirname, 'postgresBookingstest.csv')
var listings = path.join(__dirname, 'postgresListings.csv')

const importListings = () => {
  client.query(`COPY herkbath.listings(id,dailyPrice,cleaningFee,serviceFee,taxes,holidayPremium,weekendPremium,weeklyDiscount,monthlyDiscount,max_guests,min_stay,max_stay) FROM '${listings}' DELIMITER ',' CSV HEADER`, (error, results) => {
    if (error) {
      throw error
    } else  {
      console.log('this worked! ', results)
    }
  })
}

const importBookings = () => {
  client.query(`COPY herkbath.bookings(id,check_in,check_out,total_price,adults,children,infants,id_listings,id_users) FROM '${bookings}' DELIMITER ',' CSV HEADER`, (error, results) => {
    if (error) {
      throw error
    } else  {
      console.log('this worked! ', results)
    }
  })
}

importFile();