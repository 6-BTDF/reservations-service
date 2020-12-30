/* eslint-disable linebreak-style */
const { Client } = require('pg');
const path = require('path');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  database: 'sdc',
  port: 5432,
});
// eslint-disable-next-line linebreak-style

client.connect()
  .then((response) => { console.log('connected to db!'); })
  .catch((err) => { console.log(err); });

const bookings = path.join(__dirname, 'postgresBookings.csv');
const bookingsQuery = 'herkbath.bookings(check_in,check_out,total_price,adults,children,infants,id_listings,id_users)';

const listings = path.join(__dirname, 'postgresListings.csv');
const listingsQuery = 'herkbath.listings(dailyPrice,cleaningFee,serviceFee,taxes,holidayPremium,weekendPremium,weeklyDiscount,monthlyDiscount,listings_name,owner,max_guests,min_stay,max_stay)';

const users = path.join(__dirname, 'postgresUsers.csv');
const usersQuery = 'herkbath.users(username)';

const importFile = (queryDetails, file, bool = false) => {
  client.query(`COPY ${queryDetails} FROM '${file}' DELIMITER ',' CSV HEADER`, (error, results) => {
    if (error) {
      throw error;
    } else if (bool) {
      client.query('ALTER TABLE herkbath.bookings ADD CONSTRAINT fk_listings FOREIGN KEY (id_listings) references herkbath.listings(listings_id) ON DELETE CASCADE', (err, result) => {
        if (error) {
          throw error;
        } else {
          client.query('ALTER TABLE herkbath.bookings ADD CONSTRAINT fk_users FOREIGN KEY (id_users) references herkbath.users(users_id) ON DELETE CASCADE', (err, result) => {
            if (err) {
              throw err;
            } else {
              console.timeEnd('importFile');
              console.log('this worked! ', results);
            }
          })
        }
      });
    } else {
      console.timeEnd('importFile');
      console.log('this worked! ', results);
    }
  });
};

console.time('importFile');
// importFile(usersQuery, users);
importFile(listingsQuery, listings);
// importFile(bookingsQuery, bookings, true);

//CREATE INDEX idx_bookings_listings on herkbath.bookings(id_listings);
//CREATE INDEX idx_bookings_users on herkbath.bookings(id_users);
//CREATE INDEX idx_listings_users on herkbath.listings(owner);
//ALTER TABLE herkbath.listings ADD CONSTRAINT fk_users FOREIGN KEY (owner) references herkbath.users(users_id) ON DELETE CASCADE;