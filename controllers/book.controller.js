const shortid = require('shortid');
var db = require('../db.js');

module.exports.index = function(req,res){
  res.render('books/index.pug',{
    books: db.get('books').value()
  })
};
module.exports.create = function(req,res){
  res.render('books/create.pug');
};

module.exports.postCreate = function(req,res){
  var id = shortid.generate();
  db.get('books').push({id: id, title: req.body.name, des: req.body.description}).write();
  
  res.redirect('/books')
};
module.exports.delete = function (req,res){
  var id = req.params.id;
  db.get('books').remove({id:id}).write();
  res.redirect('/books');
};