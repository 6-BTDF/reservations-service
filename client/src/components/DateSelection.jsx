import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './DateSelection.css';

function DateSelection({ onDropdown, dateSelectionProps: { checkingDates, setCheckInDate, setCheckOutDate, dropDownCheckingToggle, focusedDate, setFocusedDate, setCheckingDatesSet } }) {
  const checkInDefined = Boolean(checkingDates[0]);
  const checkOutDefined = Boolean(checkingDates[1]);
  const checkInDate = checkingDates[0];
  const checkOutDate = checkingDates[1];
  const [focusedCheckIn, setFocusedCheckIn] = useState(false);
  const [focusedCheckOut, setFocusedCheckOut] = useState(false);
  const [checkInInput, setCheckInInput] = useState('');
  const [checkOutInput, setCheckOutInput] = useState('');
  const textInput = React.createRef();
  let checkInDateStr = '';
  let checkOutDateStr = '';
  if (checkInDefined) {
    checkInDateStr = `${checkInDate.getMonth() + 1}/${checkInDate.getDate()}/${checkInDate.getFullYear()}`;
  }
  if (checkOutDefined) {
    checkOutDateStr = `${checkOutDate.getMonth() + 1}/${checkOutDate.getDate()}/${checkOutDate.getFullYear()}`;
  }
  useEffect(() => {
    if (checkInDate) {
      setCheckInInput(checkInDateStr);
      setCheckOutInput(checkOutDateStr);
    } else {
      setCheckInInput('');
      setCheckOutInput('');
    }
  }, [checkInDate]);
  function flipCheckInFocus(e) {
    setFocusedCheckIn(!focusedCheckIn);
  }
  function flipCheckOutFocus(e) {
    setFocusedCheckOut(!focusedCheckOut);
  }
  function submitCheckIn(e) {
    e.preventDefault();
    let split;
    let areNums;
    let inputIsDate;
    let targetValue;
    let checkingType;
    if (!checkInDefined) {
      checkingType = 'in';
      targetValue = e.target.checkIn.value;
      split = targetValue.split('/');
      areNums = split.filter(((ele) => Number.isNaN(ele))).length === 0;
      inputIsDate = split.length === 3 && areNums;
    } else {
      checkingType = 'out';
      targetValue = e.target.checkOut.value;
      split = targetValue.split('/');
      areNums = split.filter(((ele) => Number.isNaN(ele))).length === 0;
      inputIsDate = split.length === 3 && areNums;
    }
    if (targetValue === '') {
      if (checkingType === 'in') {
        setCheckInDate(undefined);
        setFocusedDate(undefined);
      } else if (checkingType === 'out') {
        setCheckOutDate(undefined);
        setCheckingDatesSet(false);
      }
    } else if (!inputIsDate) {
      window.alert('Please enter a valid date');
    } else {
      const year = split[2];
      const month = split[0] === 0 ? split[0] : parseInt(split[0], 10) - 1;
      const day = split[1];
      if (checkingType === 'in') {
        setCheckInDate(new Date(year, month, day));
        setFocusedDate(new Date(year, month, day));
        e.target.children[0].blur();
        textInput.current.focus();
      } else if (checkingType === 'out') {
        setCheckOutDate(new Date(year, month, day));
        setFocusedDate(undefined);
        setCheckingDatesSet(true);
      }
    }
  }
  if (onDropdown) {
    return (
      <div className={`${styles.checkingContainer} ${styles.dropdown}`} >
        <div className={styles.insideCheckingContainer}>
          <span className={`${styles.checkIn} ${styles.box} ${focusedCheckIn ? styles.focused : ''}`}>
            <label htmlFor="checkIn">
              <div className={styles.checkLargeText}>Check-In</div>
              <form onSubmit={(e) => submitCheckIn(e)}>
                <input id="checkIn" placeholder={focusedCheckIn ? "MM/DD/YYYY" : "Add date"} type="text" onFocus={flipCheckInFocus} onBlur={(e) => (flipCheckInFocus(e))} value={checkInInput} onChange={(e) => setCheckInInput(e.target.value)} autoFocus={!checkInDefined} autoComplete="off"></input>
              </form>
            </label>
          </span>
          <span className={`${styles.checkOut} ${styles.box} ${focusedCheckOut ? styles.focused : ''} ${checkInDefined ? ''
            : styles.disabled}`}>
            <label htmlFor="checkOut">
              <div className={styles.checkLargeText}>CheckOut</div>
              <form onSubmit={(e) => submitCheckIn(e)} className={checkInDefined ? ''
                : styles.disabled}>
                <input id="checkOut" ref={textInput} placeholder={focusedCheckOut ? "MM/DD/YYYY" : "Add date"} type="text" value={checkOutInput} onFocus={flipCheckOutFocus} onBlur={flipCheckOutFocus} value={checkOutInput} onChange={(e) => setCheckOutInput(e.target.value)} disabled={checkInDate ? false : true} autoFocus={checkInDefined} autoComplete="off" />
              </form>
            </label>
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className={`${styles.checkingContainer} ${onDropdown ? styles.dropdown : styles.notDropdown}`} onClick={dropDownCheckingToggle}>
      <div className={styles.insideCheckingContainer}>
        <span className={`${styles.checkIn} ${styles.box}`}>
          <div className={styles.checkLargeText}>Check-In</div>
          <div className={styles.checkSmallText}>{checkInDefined ? checkInDateStr : 'Add date'}</div>
        </span>
        <span className={`${styles.checkOut} ${styles.box}`}>
          <div className={styles.checkLargeText}>CheckOut</div>
          <div className={styles.checkSmallText}>{checkOutDefined ? checkOutDateStr : 'Add date'}</div>
        </span>
      </div>
    </div>
  );
}
DateSelection.propTypes = {
  // onDropdown: PropTypes.bool.isRequired,
  // checkingDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
};
export default DateSelection;
