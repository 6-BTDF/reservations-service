bin/dsbulk load -delim '|' -url '..\/cassandra\/cassReservationstest.csv' -k herkbath -t reservations_by_listing_id

bin/dsbulk load -delim '|' -url '..\/cassandra\/cassListings.csv' -k herkbath -t listings