/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const usersWriter = csvWriter();
const faker = require('faker');

const random = (num, skew = 1) => Math.floor(Math.random() ** skew * num);


const reservationsGen = (listingsCounter) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync('pListings.csv')) {
      writer = csvWriter();
      bookingsWriter = csvWriter();
    } else {
      writer = csvWriter({ sendHeaders: false });
      bookingsWriter = csvWriter({ sendHeaders: false });
    }

    // eslint-disable-next-line no-undef
    writer.pipe(fs.createWriteStream('pListings.csv', { flags: 'a' }));
    bookingsWriter.pipe(fs.createWriteStream('pBookings.csv', { flags: 'a' }));
    let bookingCounter = 1;
    for (let i = 0; i < 10000; i++) {
      const discount = Math.round(random(40)) / 4;
      const premium = Math.round(random(40)) / 4;
      const tax = Math.floor(random(4) + 5) + Math.round(random(4) * 4) / 4;
      const baseFee = random(250) + 50;
      const currentId = listingsCounter++;
      const numToWrite = Math.floor(random(25));
      bookingsGen(currentId, bookingCounter, numToWrite, baseFee, tax / 100);
      writer.write({
        id: currentId,
        dailyPrice: baseFee.toFixed(2),
        cleaningFee: (baseFee * 0.5).toFixed(2),
        serviceFee: (baseFee * 0.125).toFixed(2),
        taxes: tax,
        weeklyDiscount: discount + 10,
        monthlyDiscount: discount + 15,
        weeklyPremium: premium + 10,
        holidayPremium: premium + 15,
        max_guests: random(14) + 2,
        min_stay: random(3) + 1,
        max_stay: random(40) + 3,
      });
      bookingCounter += numToWrite;
    }
    writer.end();
    bookingsWriter.end();
    bookingsWriter.on("finish", () => {
      resolve(true);
      console.log('done with bookings ' + listingsCounter)
    });
    bookingsWriter.on("error", reject);
  });
  ;
};

const bookingsGen = (listingId, counter, numToWrite, prices, taxes) => {
  const today = new Date();
  const startDate = new Date();
  const endDate = new Date();
  startDate.setDate(today.getDate() + random(15));
  for (let j = 0; j < numToWrite; j++) {
    const stayAmount = random(15) + 1;
    endDate.setDate(startDate.getDate() + stayAmount);
    const totalCharges = ((prices * (1.125 + taxes) * stayAmount) + (prices * 0.5)).toFixed(2);
    const startFormatted = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    const endFormatted = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
    bookingsWriter.write({
      id: counter++,
      id_listings: listingId,
      check_in: startFormatted,
      check_out: endFormatted,
      total_price: totalCharges,
      adults: Math.floor(random(5) + 1),
      children: Math.floor(random(5)),
      infants: Math.floor(random(5)),
      id_users: Math.floor(random(1000000) + 1),
    });
    startDate.setDate(endDate.getDate() + random(3) + 1);
  }
  // console.log('done with bookings '+ listingId);
};

const usersGen = () => {
  let counter = 1;
  usersWriter.pipe(fs.createWriteStream('pUsers.csv'));
  for (let i = 0; i < 1000000; i++) {
    usersWriter.write({
      id: counter++,
      username: faker.internet.userName(),
    });
  }
  usersWriter.end();
  console.log('done with users');
};

async function seedBookingsAndListings() {
  let listingsCounter = 1;
  for (let i = 0; i < 1000; i++) {
    await reservationsGen(listingsCounter);
    listingsCounter += 10000;
  }
}
seedBookingsAndListings();
// bookingsGen();
usersGen();
