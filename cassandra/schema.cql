CREATE KEYSPACE herkbath WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor' : 1};

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
  daily_price decimal,
  cleaning_fee decimal,
  service_fee decimal,
  taxes decimal,
  holiday_premium decimal,
  weekend_premium decimal,
  weekly_discount decimal,
  monthly_discount decimal,
  PRIMARY KEY (hotel_id))
  WITH comment = 'Q1. Find given hotel'

CREATE TABLE herkbath.reservations_by_listing_id (
  hotel_id int,
  confirm_number int,
  start_date date,
  end_date date,
  total_price decimal,
  adults tinyint,
  children tinyint,
  infants tinyint,
  guest_id int,
  PRIMARY KEY ((hotel_id), confirm_number) )
  WITH comment = 'Q2. Find available rooms by listing id'

CREATE TABLE herkbath.reservations_by_confirmation (
  hotel_id int,
  confirm_number int,
  start_date date,
  end_date date,
  total_price decimal,
  adults tinyint,
  children tinyint,
  infants tinyint,
  guest_id int,
  PRIMARY KEY (confirm_number) )
  WITH comment = 'Q3. Find reservations by confirmation no'