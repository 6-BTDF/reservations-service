import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  // vus: 500,
  stages: [
    { duration: '10s', target: 100 },
    { duration: '10s', target: 500 },
    { duration: '60s', target: 1500 },
    { duration: '10s', target: 500 },
  ],
  // duration: '90s',
};

const random = (num, skew = 1) => Math.floor(Math.random() ** skew * num);

export default function () {
  http.get(`http://localhost:3002/api/listings/${random(10000000)}`);
  sleep(1);
}