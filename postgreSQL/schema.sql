-- postgres database creation

DROP DATABASE IF EXISTS sdc

CREATE DATABASE sdc

-- ---
-- Table 'listings'
--
-- ---

create SCHEMA IF NOT EXISTS herkbath;

DROP TABLE IF EXISTS herkbath.listings;

CREATE TABLE herkbath.listings (
  listings_id INT GENERATED ALWAYS AS IDENTITY,
  dailyPrice NUMERIC(8,2) DEFAULT 100 NOT NULL CONSTRAINT positive_dailyPrice CHECK (dailyPrice > 0),
  cleaningFee NUMERIC(6,2) DEFAULT 49 NOT NULL CONSTRAINT positive_cleaningFee CHECK (cleaningFee > 0),
  serviceFee NUMERIC(6,2) DEFAULT 10 NOT NULL CONSTRAINT positive_serviceFee CHECK (serviceFee > 0),
  taxes NUMERIC(4,2) DEFAULT 8 NOT NULL CONSTRAINT positive_taxes CHECK (taxes > 0),
  holidayPremium NUMERIC(5,2) DEFAULT NULL CONSTRAINT positive_holidayPremium CHECK (holidayPremium >= 0),
  weekendPremium NUMERIC(5,2) DEFAULT NULL CONSTRAINT positive_weekendPremium CHECK (weekendPremium >= 0),
  weeklyDiscount NUMERIC(5,2) DEFAULT NULL CONSTRAINT positive_weeklyDiscount CHECK (weeklyDiscount >= 0),
  monthlyDiscount NUMERIC(5,2) DEFAULT NULL CONSTRAINT positive_monthlyDiscount CHECK (monthlyDiscount >= 0),
  listings_name text NOT NULL,
  owner INT NOT NULL,
  max_guests SMALLINT DEFAULT 4 NOT NULL CONSTRAINT positive_max_guests CHECK (max_guests < 17),
  min_stay SMALLINT DEFAULT 1 CONSTRAINT positive_min_stay CHECK (min_stay > 0),
  max_stay SMALLINT DEFAULT NULL CONSTRAINT positive_max_stay CHECK (max_stay > 0),
  PRIMARY KEY (id)
)


-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS herkbath.users

CREATE TABLE herkbath.users (
  users_id INT GENERATED ALWAYS AS IDENTITY,
  username CHAR(30) NOT NULL,
  PRIMARY KEY (id)
)


-- ---
-- Table 'bookings'
--
-- ---

DROP TABLE IF EXISTS herkbath.bookings

CREATE TABLE herkbath.bookings (
  bookings_id INT GENERATED ALWAYS AS IDENTITY,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  total_price NUMERIC(8,2) NOT NULL CONSTRAINT positive_price CHECK (total_price > 0),
  adults SMALLINT DEFAULT 1 NOT NULL CONSTRAINT positive_adults CHECK (adults > 0),
  children SMALLINT DEFAULT 0 CONSTRAINT positive_children CHECK (children >= 0),
  infants SMALLINT DEFAULT 0 CONSTRAINT positive_infants CHECK (infants >= 0),
  id_listings INT,
  id_users INT,
  PRIMARY KEY (id)
)

-- CONSTRAINT fk_listings references herkbath.listings(id) ON DELETE CASCADE
--CONSTRAINT fk_listings references herkbath.listings(id)
-- CONSTRAINT fk_users references herkbath.users(id)
-- ---
-- Foreign Keys
-- ---
-- ---
-- Table Properties
-- ---

-- ALTER TABLE listings ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE bookings ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE users ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO listings (id,dailyPrice,weeklyDiscount,monthlyDiscount,max_guests,min_stay,max_stay) VALUES
-- ('','','','','','','');
-- INSERT INTO bookings (id,checkin,checkout,adults,children,infants,id_listings,id_users) VALUES
-- ('','','','','','','','');
-- INSERT INTO users (id,username) VALUES
-- ('','');