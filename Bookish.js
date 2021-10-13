const express = require("express");
const app = express();
const pgp = require("pg-promise")();
const Book = require("./BooksClass.js");
const passport = require("passport");
const passportJwt = require("passport-jwt");
const jwt = require("jsonwebtoken");
const postgresPassword = require("./postgresPassword.js");
const db = pgp(
  `postgres://postgres:${postgresPassword}@localhost:5432/bookish`
);


app.get("/books", (req, res) => {
  db.any("SELECT * FROM books", [true])
    .then((data) => {
      const books = [];
      for (let i = 0; i < data.length; i++) {
        const id = data[i].id;
        const name = data[i].name;
        const isbn = data[i].isbn;
        const numberOfCopies = data[i].numberofcopies;
        const author_id = data[i].authorid;

        books.push(new Book(id, name, isbn, numberOfCopies, author_id));
      }
      res.send(books).json;
    })
    .catch(function (error) {
      console.error(error);
    });
});

// configurePassport();

// app.use(passport.initialize());

app.get("/login", (req, res) => {
  db.any("SELECT username,password FROM accounts", [true])
    .then((accounts) => {
        const username = req.query.username;
        const password = req.query.password;

        const requestedAccount = accounts.find(requestedAccount => requestedAccount.username === username);
        if (requestedAccount.password === password) {
            res.send({
            message: `Hello, ${username}!`,
            //token: createTokenForUser(username),
            requestedAccount
            });
        }
        else {
            res.status(400).send({
            errors: "Nope your username or password is wrong",
            });
        }
      })
      .catch(function (error) {
        console.error(error, 'HHHHHHHH');
    });
});

app.listen(3000, () => {
  console.log(`http://localhost:3000/books http://localhost:3000/login`);

});

// function configurePassport() {
//   const jwtOptions = {
//     jwtFromRequest: passportJwt.ExtractJwt.fromHeader("x-access-token"),
//     secretOrKey: secret,
//   };
//   passport.use(
//     new passportJwt.Strategy(jwtOptions, (decodedJwt, next) => {
//       // Check whether the decodedJwt.username exists
//     })
//   );
// }

function createTokenForUser(username) {
  return jwt.sign({ username: username }, secret);
}
