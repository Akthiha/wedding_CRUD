const express = require('express');
const app = express();
const ejs = require ('ejs')
app.set ('view engine', 'ejs')
const port = 3000;


// const logger = require('./middlewares/logger');
// const { createRsvp } = require('./controllers/rsvpController');

// app.use(logger);
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.post('/rsvp', createRsvp);

//starting point
app.get ("/", (req, res) =>{
    res.render ("index");
})

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
