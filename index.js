const express = require('express');
const app = express();
const port = 3000;

// const logger = require('./middlewares/logger');
// const { createRsvp } = require('./controllers/rsvpController');

// app.use(logger);
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.post('/rsvp', createRsvp);

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
