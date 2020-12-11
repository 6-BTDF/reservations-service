import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  vus: 1000,
  duration: '30s',
};

const random = (num, skew = 1) => Math.floor(Math.random() ** skew * num);

export default function () {
  http.get(`http://localhost:3002/api/listings/${random(10000000)}`);
  sleep(1);
}