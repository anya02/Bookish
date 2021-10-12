CREATE TABLE authors (
	id SERIAL PRIMARY KEY,
	name varchar(50) NOT NULL
);

CREATE TABLE accounts(
	id SERIAL PRIMARY KEY,
	name varchar(50) NOT NULL,
	username varchar(20) NOT NULL,
	password varchar(20) NOT NULL
);

CREATE TABLE books (
	id SERIAL PRIMARY KEY,
	name varchar(50) NOT NULL,
	isbn BIGINT NOT NULL,
	numberOfCopies INT NOT NULL,
	authorID INT,
	foreign KEY (authorId) REFERENCES authors(id)
);

CREATE TABLE checkouts (
	id SERIAL PRIMARY KEY,
	due_date Date NOT NULL,
	accountID INT,
	bookID INT,
	foreign KEY (accountID) REFERENCES accounts(id),
	foreign KEY (bookID) REFERENCES books(id)
);