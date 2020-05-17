var express = require('express');
var multer = require("multer");

var controllerBook = require('../controllers/book.controller');

var upload = multer({ dest: "uploads/" });

var router = express.Router();

router.get('/', controllerBook.index);

router.get('/search', controllerBook.search);

router.get('/create', controllerBook.create);

router.get('/:bookId/delete', controllerBook.delete);

router.get('/:bookId/update', controllerBook.getUpdate);

router.post('/create', controllerBook.postCreate);

router.post('/update', upload.single("bookCover"), controllerBook.postUpdate);

module.exports = router;