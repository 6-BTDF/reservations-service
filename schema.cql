CREATE KEYSPACE herkbath WITH replication =
  {‘class’: ‘SimpleStrategy’, ‘replication_factor’ : 1};

CREATE TYPE herkbath.price (
  dailyPrice decimal,
  cleaningFee decimal,
  serviceFee decimal,
  taxes decimal,
  holidayPremium tinyint,
  weekendPremium tinyint,
  weeklyDiscount tinyint,
  monthlyDiscount tinyint
)

CREATE TYPE herkbath.guests (
  adults tinyint,
  children tinyint,
  infants tinyint
)

CREATE TABLE herkbath.listings (
  hotel_id int,
  max_guests tinyint,
  min_stay tinyint,
  max_stay tinyint,
  prices frozen<herkbath.price>,
  PRIMARY KEY (hotel_id))
  WITH comment = ‘Q1. Find given hotel’

CREATE TABLE herkbath.reservations_by_listing_id (
  hotel_id int,
  start_date date,
  end_date date,
  total_price decimal,
  guests frozen<herkbath.guests>,
  confirm_number int,
  guest_id int,
  PRIMARY KEY ((hotel_id), start_date) )
  WITH comment = ‘Q2. Find available rooms by listing id’;

CREATE TABLE herkbath.reservations_by_confirmation (
  hotel_id int,
  start_date date,
  end_date date,
  total_price decimal,
  guests frozen<herkbath.guests>,
  confirm_number int,
  guest_id int,
  PRIMARY KEY (confirm_number) )
  WITH comment = ‘Q3. Find reservations by confirmation no’;