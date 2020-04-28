const shortid = require('shortid');
var db = require('../db.js');

module.exports.index = function(req,res){
   res.render('transactions/index.pug',{
     trans: db.get('transactions').value()
   })
};
module.exports.create = function(req,res){
  res.render('transactions/create.pug',{
    users: db.get('users').value(),
    books: db.get('books').value()
  })
};
module.exports.postCreate = function(req,res){
  var id = shortid.generate();
  db.get('transactions').push({id:id,isCompleted:false,...req.body}).write();
  
  res.redirect('/transactions')
};
module.exports.complete = function(req,res){
  var postId = req.params.id;
  db.get('transactions').find({id:postId}).assign({isCompleted:true}).write();
  res.redirect('/transactions');
};