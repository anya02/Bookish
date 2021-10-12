CREATE TABLE authors (
	id SERIAL PRIMARY KEY,
	name varchar(50) NOT NULL
)

CREATE TABLE books(
	id SERIAL PRIMARY KEY,
	name varchar(50) NOT NULL,
	foreign KEY (authors_id) REFERENCES authors(authors_id),
	isbn BIGINT(9999999999999) NOT NULL,
	numberOfCopies INT(127) NOT INT
)

)
CREATE Checkouts(
	id SERIAL PRIMARY KEY,
	due_date Date NOT NULL,
	
)

-- stuff that needs to get linked--

CREATE TABLE accounts(
	id SERIAL PRIMARY KEY,
	name varchar(50) NOT NULL,
	password varchar(20) NOT NULL,
	username varchar(20) NOT NULL

-- linking part--
SELECT book.name
from books
	JOIN authors ON books.authors_id = authors_id
-- foreign key--