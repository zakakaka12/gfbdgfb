const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const { Book, Author, Genre, Publisher } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', async (req, res) => {
  const theme = req.query.theme || null;
  const where = theme ? { Theme: theme } : {};
  const books = await Book.findAll({ where, include: [Author, Genre, Publisher], order: [['BookID','DESC']] });
  res.render('index', { books, theme });
});

app.get('/add-book', async (req, res) => {
  const authors = await Author.findAll();
  const genres = await Genre.findAll();
  const publishers = await Publisher.findAll();
  res.render('add-book', { authors, genres, publishers });
});

app.post('/add-book', async (req, res) => {
  const { title, theme, authorId, genreId, publisherId } = req.body;
  await Book.create({
    Title: title,
    Theme: theme || null,
    AuthorId: authorId || null,
    GenreId: genreId || null,
    PublisherId: publisherId || null
  });
  res.redirect('/');
});

app.get('/add-author', (req, res) => { res.render('add-author'); });
app.post('/add-author', async (req, res) => {
  const { name } = req.body;
  await Author.create({ Name: name });
  res.redirect('/');
});

app.get('/add-genre', (req, res) => { res.render('add-genre'); });
app.post('/add-genre', async (req, res) => {
  const { name } = req.body;
  await Genre.create({ Name: name });
  res.redirect('/');
});

app.get('/add-publisher', (req, res) => { res.render('add-publisher'); });
app.post('/add-publisher', async (req, res) => {
  const { name } = req.body;
  await Publisher.create({ Name: name });
  res.redirect('/');
});

// sync and start
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch(err => {
  console.error('DB sync error', err);
});