CREATE DATABASE rsvp;

CREATE TABLE wedding_rsvp (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  attending BOOLEAN NOT NULL,
  guests INTEGER NOT NULL,
  main_dish_choice VARCHAR(20) CHECK (main_dish_choice IN ('chicken', 'fish', 'vegetarian')),
  table_number INTEGER
);