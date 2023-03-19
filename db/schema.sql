CREATE DATABASE rsvp;

CREATE TABLE wedding_rsvp (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  attending BOOLEAN NOT NULL,
  guests INTEGER NOT NULL,
  main_dish_choice VARCHAR(20) CHECK (main_dish_choice IN ('chicken', 'fish', 'vegetarian')),
  guest1_name TEXT,
  guest1_main_dish_choice VARCHAR(20) CHECK (guest1_main_dish_choice IN ('chicken', 'fish', 'vegetarian')),
  guest2_name TEXT,
  guest2_main_dish_choice VARCHAR(20) CHECK (guest2_main_dish_choice IN ('chicken', 'fish', 'vegetarian')),
  guest3_name TEXT,
  guest3_main_dish_choice VARCHAR(20) CHECK (guest3_main_dish_choice IN ('chicken', 'fish', 'vegetarian')),
  guest4_name TEXT,
  guest4_main_dish_choice VARCHAR(20) CHECK (guest4_main_dish_choice IN ('chicken', 'fish', 'vegetarian')),
  guest5_name TEXT,
  guest5_main_dish_choice VARCHAR(20) CHECK (guest5_main_dish_choice IN ('chicken', 'fish', 'vegetarian')),
  guest6_name TEXT,
  guest6_main_dish_choice VARCHAR(20) CHECK (guest6_main_dish_choice IN ('chicken', 'fish', 'vegetarian')),
  guest7_name TEXT,
  guest7_main_dish_choice VARCHAR(20) CHECK (guest7_main_dish_choice IN ('chicken', 'fish', 'vegetarian')),
  guest8_name TEXT,
  guest8_main_dish_choice VARCHAR(20) CHECK (guest8_main_dish_choice IN ('chicken', 'fish', 'vegetarian')),
  guest9_name TEXT,
  guest9_main_dish_choice VARCHAR(20) CHECK (guest9_main_dish_choice IN ('chicken', 'fish', 'vegetarian')),
  guest10_name TEXT,
  guest10_main_dish_choice VARCHAR(20) CHECK (guest10_main_dish_choice IN ('chicken', 'fish', 'vegetarian'))
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

