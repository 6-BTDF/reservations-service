/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import CalendarDates from './CalendarDates.jsx';
import styles from './Calendar.css';

function Calendar({ props: { setCheckInDate, setCheckOutDate, setCheckingDatesSet, checkInDate, checkOutDate, focusedDate, setFocusedDate } }) {
  const today = new Date();
  const startingDate = checkInDate || today;
  const [forwardRender, setForwardRender] = useState(false);
  const [backRender, setBackRender] = useState(false);
  const [currDate, setCurrDate] = useState(startingDate);
  const [offGridLeftDate, setOffGridLeftDate] = useState(getMinusOneMonth(currDate));
  const dateLeft = getPlusOneMonth(offGridLeftDate);
  const [dateRight, setDateRight] = useState(getPlusOneMonth(currDate));
  const offGridRightDate = getPlusOneMonth(dateRight);

  const prevMonth = getMinusOneMonth(currDate);
  const onPresentMonth = prevMonth.getMonth() >= today.getMonth();
  const notOnCurrYear = prevMonth.getFullYear() > today.getFullYear();
  const moveBackBool = onPresentMonth || notOnCurrYear;
  function decreaseMonth() {
    const nextDate = getMinusOneMonth(currDate);
    // console.log(`currDate: ${nextDate.toLocaleString('default', { month: 'long', year: 'numeric' })}`);
    if (moveBackBool) {
      setOffGridLeftDate(nextDate);
      setCurrDate(nextDate);
      setDateRight(getPlusOneMonth(currDate));
      setForwardRender(false);
      setBackRender(true);
    }
  }
  function increaseMonth() {
    // On first render or on present date, leftDate is equal to the desired date
    // set offGridLeft to desired date - 1
    // set right to desired date + 1
    // every other render, right is equal to the desired date
    // set right to the desired date
    // sett off grid left to desired date - 2;
    const nextDate = getPlusOneMonth(currDate);
    setCurrDate(nextDate);
    setDateRight(nextDate);
    setOffGridLeftDate(getMinusOneMonth(currDate));
    setBackRender(false);
    setForwardRender(true);
  }
  function getPlusOneMonth(date) {
    const tempDate = new Date(date);
    return new Date(tempDate.setMonth(date.getMonth() + 1));
  }
  function getMinusOneMonth(date) {
    const tempDate = new Date(date);
    return new Date(tempDate.setMonth(date.getMonth() - 1));
  }
  function createDatesArray(dateObj) {
    // create new array with 35 elements
    const dates = new Array(41);
    // set the date obj to the first day of the month
    const firstDayObj = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
    // get the day of the week of the first day of the month
    const firstDay = firstDayObj.getDay();
    // fill in the previous dates before that with empty strings
    dates.fill('', 0, firstDay);
    // set the first date to the index in the array that correponds off the day of the week
    // loop through all of the days of the month and fill in the array
    let dayCount = 1;
    let arrayIndex = firstDay;
    let movingDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dayCount);
    while (movingDate.getMonth() === dateObj.getMonth()) {
      dates[arrayIndex] = movingDate;
      arrayIndex += 1;
      movingDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dayCount += 1);
    }
    return dates;
  }
  return (
    <div id={styles.calendarContainer}>
      <div id={styles.calendarBar}>
        <button className={`${styles.backButton} ${moveBackBool ? '' : styles.disabled}`} type="button" onClick={decreaseMonth} disabled={!moveBackBool}>
          <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false">
            <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fillRule="evenodd" />
          </svg>
        </button>
        <span className={`${styles.leftMonthSpan} ${backRender ? styles.animateBack : ''} ${forwardRender ? styles.animateForward : ''}`} key={offGridLeftDate.getTime() - 1}>{`${dateLeft.toLocaleString('default', { month: 'long', year: 'numeric' })}`}</span>
        <span className={`${styles.rightMonthSpan} ${backRender ? styles.animateBack : ''} ${forwardRender ? styles.animateForward : ''}`} key={offGridRightDate.getTime() - 1}>{`${dateRight.toLocaleString('default', { month: 'long', year: 'numeric' })}`}</span>
        <button type="button" onClick={increaseMonth}>
          <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false">
            <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" />
          </svg>
        </button>
      </div>

      <div id={styles.offGridLeftBar}>
        <span className={`${styles.offGridLeftSpan} ${backRender ? styles.animateBack : ''}`} key={offGridLeftDate.getTime() - 2}>{`${offGridLeftDate.toLocaleString('default', { month: 'long', year: 'numeric' })}`}</span>
      </div>
      <CalendarDates key={offGridLeftDate.getTime()} side="offGridLeft" currMonth={offGridLeftDate.getMonth()} dates={createDatesArray(offGridLeftDate)} setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate} setCheckingDatesSet={setCheckingDatesSet} checkInDate={checkInDate} checkOutDate={checkOutDate} focusedDate={focusedDate} setFocusedDate={setFocusedDate} forwardRender={forwardRender} backRender={backRender} />

      <CalendarDates key={offGridLeftDate.getTime() + 1} side="left" currMonth={dateLeft.getMonth()} dates={createDatesArray(dateLeft)} setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate} setCheckingDatesSet={setCheckingDatesSet} checkInDate={checkInDate} checkOutDate={checkOutDate} focusedDate={focusedDate} setFocusedDate={setFocusedDate} forwardRender={forwardRender} backRender={backRender} />
      <CalendarDates key={offGridRightDate.getTime() + 1} side="right" currMonth={dateRight.getMonth()} dates={createDatesArray(dateRight)} setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate} setCheckingDatesSet={setCheckingDatesSet} checkInDate={checkInDate} checkOutDate={checkOutDate} focusedDate={focusedDate} setFocusedDate={setFocusedDate} forwardRender={forwardRender} backRender={backRender} />
      <div id={styles.offGridRightBar}>
        <span className={`${styles.offGridRightSpan} ${forwardRender ? styles.animateForward : ''}`} key={offGridRightDate + 2}>{`${offGridRightDate.toLocaleString('default', { month: 'long', year: 'numeric' })}`}</span>
      </div>
      <CalendarDates key={offGridRightDate.getTime()} side="offGridRight" currMonth={offGridRightDate.getMonth()} dates={createDatesArray(offGridRightDate)} setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate} setCheckingDatesSet={setCheckingDatesSet} checkInDate={checkInDate} checkOutDate={checkOutDate} focusedDate={focusedDate} setFocusedDate={setFocusedDate} forwardRender={forwardRender} backRender={backRender} />
    </div>
  );
}
CalendarDates.propTypes = {
  // setCheckInDate: PropTypes.func.isRequired,
  // setCheckOutDate: PropTypes.func.isRequired,
};
export default Calendar;
