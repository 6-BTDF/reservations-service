import React, { useState } from 'react';
import App from './App.jsx';
import styles from './Container.css';

function Container() {
  return (
    <div id={styles.container}>
      <div id={styles.centerBody}>
        <div id={styles.entireCabin}>
          <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/EntireCabin.png" alt="none" />
        </div>
        <div id={styles.entireHome}>
          <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/EntireHome.png" alt="none" />
        </div>
        <div id={styles.contactHost}>
          <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/ContactHost.png" alt="none" />
        </div>
        <div id={styles.sleepingArrangements}>
          <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/SleepingArrangements.png" alt="none" />
        </div>
        <div id={styles.amenities}>
          <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/Amenities.png" alt="none" />
        </div>
        <div id={styles.calendar}>
          <img src="https://ailpup-fec-reservations.s3-us-west-1.amazonaws.com/SelectCheckOutDate.png" alt="none" />
        </div>
      </div>
      <App />
    </div>
  );
}

export default Container;
