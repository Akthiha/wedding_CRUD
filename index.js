const express = require('express');
const app = express();
const ejs = require('ejs');
const { Pool } = require('pg');
const pool = new Pool({
 database: 'rsvp',
});
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000 ;

// Starting point
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/guestinfo', (req, res) => {
  res.render('guestinfo');
});

app.get('/rsvpForm', (req, res) => {
  res.render('rsvpForm');
});

app.post('/rsvp', (req, res) => {
  const { name, email, attending, guests, main_dish_choice, table_number } = req.body;
  const query = 'INSERT INTO wedding_rsvp (name, email, attending, guests, main_dish_choice, table_number) VALUES ($1, $2, $3, $4, $5, $6)';
  const values = [name, email, attending, guests, main_dish_choice, table_number];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.send('Error Occured');
    } else {
      res.send('Thanks for your registration. Wait for email confirmation.');
    }
  });
});

app.get('/menu', (req, res) => {
  res.render('menu');
});

app.get('/gallery', (req, res) => {
  res.render('gallery');
});

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
