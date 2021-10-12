const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const Books = require('./BooksClass.js');
const postgresPassword = require('./postgresPassword.js')

const db = pgp(`postgres://postgres:${postgresPassword}@localhost:5432/bookish`);


// db.one({
//   text: 'SELECT * FROM books', // can also be a QueryFile object
// })
//   .then(user => {
//       console.log(text)

//       app.get('/', (req, res) => {
//         res.send('Hello World')
//         })

//   })
//   .catch(error => {
//       console.error(error)    
//   });

app.listen(3000, () => {
            console.log(`Example app listening at http://localhost:3000`);
        });

