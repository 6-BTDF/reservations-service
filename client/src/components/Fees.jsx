import React from 'react';
import styles from './Fees.css';

function Fees({ listingData, checkInDate, checkOutDate }) {
  let lengthOfStay;
  if (checkInDate && checkOutDate) {
    lengthOfStay = (new Date(checkOutDate - checkInDate)).getDate();
  }
  return (
    <div id={styles.fees}>
      <ul className={`${styles.message} ${styles.fee}`}>
        <text>You won't be charged yet</text>
      </ul>
      <ul className={`${styles.nights} ${styles.fee}`}>
        <span id={styles.perNightDescription}>{`$${listingData.dailyprice} x ${lengthOfStay} ${lengthOfStay > 1 ? 'nights' : 'night'}`}</span>
        <span className={styles.price}>{`$${listingData.dailyprice * lengthOfStay}`}</span>
      </ul>
      <ul className={`${styles.cleaning} ${styles.fee}`}>
        <span id={styles.cleaningDescription}>Cleaning Fee</span>
        <span className={styles.price}>{`$${parseInt(listingData.cleaningfee)}`}</span>
      </ul>
      <ul className={`${styles.service} ${styles.fee}`}>
        <span id={styles.serviceDescription}>Service Fee</span>
        <span className={`${styles.price} ${styles.this}`}>{`$${parseInt(listingData.servicefee)}`}</span>
      </ul>
      <ul className={`${styles.total} ${styles.fee}`}>
        <span>Total</span>
        <span>{`$${parseInt(listingData.cleaningfee) + parseInt(listingData.dailyprice) * lengthOfStay + parseInt(listingData.servicefee)}`}</span>
      </ul>
    </div>
  );
}

export default Fees;