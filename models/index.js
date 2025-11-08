const Book = require('./Book');
const Author = require('./Author');
const Genre = require('./Genre');
const Publisher = require('./Publisher');

// Ассоциации
Author.hasMany(Book, { foreignKey: 'AuthorId' });
Book.belongsTo(Author, { foreignKey: 'AuthorId' });

Genre.hasMany(Book, { foreignKey: 'GenreId' });
Book.belongsTo(Genre, { foreignKey: 'GenreId' });

Publisher.hasMany(Book, { foreignKey: 'PublisherId' });
Book.belongsTo(Publisher, { foreignKey: 'PublisherId' });

module.exports = { Book, Author, Genre, Publisher };