// const express = require('express');
// const app = express();
// const ejs = require('ejs');
// const { Pool } = require('pg');
// const pool = new Pool(process.env.DATABASE_URL ? {
//     connectionString: process.env.DATABASE_URL
// } : { database: 'rsvp' });
// app.set('view engine', 'ejs');
// app.use(express.urlencoded({ extended: false }));

// const port = process.env.PORT || 3000;

// // Starting point
// app.get('/', (req, res) => {
//     res.render('index');
// });

// app.get('/guestinfo', (req, res) => {
//     res.render('guestinfo');
// });

// app.get('/rsvpForm', (req, res) => {
//     res.render('rsvpForm');
// });

// // app.post('/rsvp', (req, res) => {
// //     const { name, email, attending, guests, main_dish_choice, table_number } = req.body;
// //     const query = 'INSERT INTO wedding_rsvp (name, email, attending, guests, main_dish_choice, table_number) VALUES ($1, $2, $3, $4, $5, $6)';
// //     const values = [name, email, attending, guests, main_dish_choice, table_number];

// //     pool.query(query, values, (err, result) => {
// //         if (err) {
// //             console.error(err);
// //             res.send('Error Occured');
// //         } else {
// //             res.send('Thanks for your registration. Wait for email confirmation.');
// //         }
// //     });
// // });

// app.post('/rsvp', (req, res) => {
//     const { name, email, attending, guests, main_dish_choice} = req.body;
  
//     let query = 'INSERT INTO wedding_rsvp (name, email, attending, guests, main_dish_choice)';
//     let values = [name, email, attending, guests, main_dish_choice];
  
//     for (let i = 1; i <= guests; i++) {
//       const guestName = req.body[`guest${i}_name`];
//       const guestMainDishChoice = req.body[`guest${i}_main_dish_choice`];
  
//       if (guestName && guestMainDishChoice) {
//         query += `, guest${i}_name, guest${i}_main_dish_choice`;
//         values.push(guestName, guestMainDishChoice);
//       }
//     }
  
//     query += ' VALUES (';
  
//     for (let i = 1; i <= values.length; i++) {
//       query += `$${i}`;
//       if (i < values.length) {
//         query += ', ';
//       }
//     }
  
//     query += ')';
  
//     pool.query(query,  values, (err, result) => {
//           if (err) {
//               console.error(err);
//               res.send('Error Occured');
//           } else {
//               res.send('Thanks for your registration. Wait for email confirmation.');
//           }
//       });
//   });
  

// app.get('/menu', (req, res) => {
//     res.render('menu');
// });

// app.get('/gallery', (req, res) => {
//     res.render('gallery');
// });

// app.listen(port, () => {
//     console.log(`Server listening at ${port}`);
// });
const express = require('express');
const app = express();
const ejs = require('ejs');
const { Pool } = require('pg');
const session = require('express-session');
const pool = new Pool(process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL
} : { database: 'rsvp' });
const bcrypt = require('bcrypt');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
}));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const user = req.session.user;
    res.render('index', { user }); 
});

// Authentication 
app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error(err);
            res.render('signup', { error: 'An error occurred' });
        } else {
            pool.query('INSERT INTO users (username, password_digest) VALUES ($1, $2)', [username, hash], (err, result) => {
                if (err) {
                    console.error(err);
                    res.render('signup', { error: 'An error occurred' });
                } else {
                    res.redirect('/login');
                }
            });
        }
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    pool.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
        if (err) {
            console.error(err);
            res.render('login', { error: 'An error occurred' });
        } else if (result.rows.length === 0) {
            res.render('login', { error: 'Invalid username or password' });
        } else {
            const user = result.rows[0];
            bcrypt.compare(password, user.password_digest, (err, match) => {
                if (err) {
                    console.error(err);
                    res.render('login', { error: 'An error occurred' });
                } else if (match) {
                    req.session.user = user.username;
                    res.redirect('/');
                } else {
                    res.render('login', { error: 'Invalid username or password' });
                }
            });
        }
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
});

// Authentication 
const requiresLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.redirect('/login');
    }
};

// Routes that require authentication


app.get('/guestinfo', requiresLogin, (req, res) => {
    res.render('guestinfo');
});

app.get('/rsvpForm', requiresLogin, (req, res) => {
    let guests = ''; //magic number
    res.render('rsvpForm',{guests});
});

app.post('/rsvp', requiresLogin, (req, res) => {
    const { name, email, attending, guests, main_dish_choice} = req.body;
  
    let query = 'INSERT INTO wedding_rsvp (name, email, attending, guests, main_dish_choice)';
    let values = [name, email, attending, guests, main_dish_choice];
  
    for (let i = 1; i <= guests; i++) {
      const guestName = req.body[`guest${i}_name`];
      const guestMainDishChoice = req.body[`guest${i}_main_dish_choice`];
  
      if (guestName && guestMainDishChoice) {
        query += `, guest${i}_name, guest${i}_main_dish_choice`;
        values.push(guestName, guestMainDishChoice);
      }
    }
  
    query += ' VALUES (';
  
    for (let i = 1; i <= values.length; i++) {
      query += `$${i}`;
      if (i < values.length) {
        query += ', ';
      }
    }
  
    query += ')';
  
    pool.query(query,  values, (err, result) => {
          if (err) {
              console.error(err);
              res.send('Error Occured');
          } else {
              res.send('Thanks for your registration. Wait for email confirmation.');
          }
      });
  });
  

app.get('/menu', requiresLogin, (req, res) => {
    res.render('menu');
});

app.get('/gallery', requiresLogin, (req, res) => {
    res.render('gallery');
});

app.listen(port, () => {
    console.log(`Server listening at ${port}`);
});
