const shortid = require('shortid');
var db = require('../db.js');

module.exports.index = function(req,res){
  var page = parseInt(req.query.page) || 1 ;
  var previousPage = page - 1;
  var nextPage = page + 1;
  var start = (page - 1) * 8;
  var end = page * 8;
  res.render('books/index',{
    books : db.get('books').value().slice(start,end),
    page: page,
    previousPage: previousPage,
    nextPage: nextPage,
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
// module.exports.delete = function (req,res){
//   var id = req.params.id;
//   db.get('books').remove({id:id}).write();
//   res.redirect('/books');
// };
