/* eslint-disable no-console */
require('newrelic');
const app = require('./app.js');


const port = 3002;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
