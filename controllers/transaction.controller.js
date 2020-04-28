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
  db.get('transactions').push({id:id,...req.body}).write();
  
  res.redirect('/transactions')
};