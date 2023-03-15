const pool = require('../db');
const createRsvp = async (req, res) => {
  try {
    const { name, email, attending, guests, main_dish_choice, table_number } = req.body;
    const result = await pool.query(
      'INSERT INTO wedding_rsvp (name, email, attending, guests, main_dish_choice, table_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, email, attending, guests, main_dish_choice, table_number]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createRsvp };




















































