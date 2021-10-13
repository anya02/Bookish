class Book {
    constructor (id, name, isbn, numberOfCopies, author_id) {
        this.id = id;
        this.name = name;
        this.isbn = isbn;
        this.numberOfCopies = numberOfCopies;
        this.author_id = author_id;
    }
}

module.exports = Book;