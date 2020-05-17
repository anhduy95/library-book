var shortid = require('shortid');
var cloudinary = require('cloudinary').v2;

var db = require('../db');

cloudinary.config({ 
  cloud_name: process.env.CLOUND_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

module.exports.index = function(req, res) {
  var books = db.get('books').value();  
  var page = req.query.page ? parseInt(req.query.page) : 1;
  var perPage = 5;
  
  var start = (page - 1) * perPage;
  var end = page * perPage;  
  var lengthPage = Math.ceil(books.length / perPage);

  var data = db.get('sessions').find({ id: req.signedCookies.sessionId}).get('cart').value();
  
  if (data) {
    res.locals.count = Object.values(data).reduce((sum, item) => sum + item, 0);
  }
  
  res.render('books/index', {
    books: books.slice(start, end),
    page,
    lengthPage,
    user: db.get('users').find({ userId: req.signedCookies.userId }).value()
  });
};

module.exports.search = function(req, res) {
  var q = req.query.q;
  var matchedBook = db.get('books').value().filter((book) => {
    return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  
  res.render('books/index', {
    books: matchedBook
  });
};

module.exports.create  = function(req, res) {
  res.render('books/create');
};

module.exports.delete = function(req, res) {
  var bookId = req.params.bookId;
  
  db.get('books')
    .remove({ bookId: bookId })
    .write();
  
  res.redirect('/books');
};

module.exports.getUpdate  = function(req, res) {
	var bookId = req.params.bookId;

	var book = db.get('books').find({ bookId: bookId }).value();

	res.render('books/update', {
		book: book,
    bookId: bookId
	});
};

module.exports.postCreate = function(req, res) {
  req.body.bookId = shortid.generate();
  
  db.get('books')
    .push(req.body)
    .write();
  
  res.redirect('/books');
};

module.exports.postUpdate = async function(req, res) {
  var bookId = req.body.bookId;
  var book = db.get('books').find({ bookId: bookId }).value();
  
  var file = await cloudinary.uploader.upload(req.file.path, 
    function(error, result) {console.log(result, error)});
  
  db.get('books')
    .find({ bookId: bookId })
    .assign({ title: req.body.title })
    .write();
  
  if (!book.bookCover) {
    db.get('books')
      .find({ bookId: bookId })
      .set('bookCover', file.url)
      .write();
  } else {
    db.get('books')
      .find({ bookId: bookId })
      .assign({ bookCover: file.url })
      .write();
  }
  
  res.redirect('/books');
};
