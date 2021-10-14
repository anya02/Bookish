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

const secret = "hush this is a secret";

configurePassport();

app.use(passport.initialize());

app.get("/login", (req, res) => {
  db.any("SELECT username,password FROM accounts", [true])
    .then((accounts) => {
      const username = req.query.username;
      const password = req.query.password;

      const requestedAccount = accounts.find(
        (requestedAccount) => requestedAccount.username === username
      );
      if (requestedAccount.password === password) {
        res.send({
          message: `Hello, ${username}!`,
          token: createTokenForUser(username),
        });
      } else {
        res.status(400).send({
          errors: "Your username or password is incorrect",
        });
      }
    })
    .catch(function (error) {
      res.status(500), console.error(error);
    });
});

app.get(
  "/books",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    db.any("SELECT * FROM books")
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
        res.status(500), console.error(error);
      });
  }
);

app.listen(3000, () => {
  console.log(
    `http://localhost:3000/books http://localhost:3000/login http://localhost:3000/login?username=dragonXslayer69420&password=BestRobloxPlayer123`
  );
});

function configurePassport() {
  const jwtOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromHeader("x-access-token"),
    secretOrKey: secret,
  };
  passport.use(
    new passportJwt.Strategy(jwtOptions, (decodedJwt, done) => {
      db.any("SELECT * FROM accounts")
        .then((accounts) => {
          const requestedAccount = accounts.find(
            (account) => account.username === decodedJwt.username
          );
          if (requestedAccount !== undefined) {
            done(null, requestedAccount);
          } else {
            done(null, false);
          }
        })
        .catch(function (error) {
          done(error, false);
        });
    })
  );
}

function createTokenForUser(username) {
  return jwt.sign({ username: username }, secret);
}