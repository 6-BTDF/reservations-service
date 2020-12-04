const fs = require('fs');
const csvWriter = require('csv-write-stream');
var writer = csvWriter();
var faker = require('faker');
var counter = 0;

const dataGen = () => {
  writer.pipe(fs.createWriteStream('data.csv'));
  for (var i = 0; i < 10000000; i++) {
    writer.write({
      id: counter++,
      price: faker.commerce.price()
    })
  }

  writer.end();
  console.log('done');
}

dataGen();


