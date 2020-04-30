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
module.exports.checkId = function(req,res){
  var inputId = req.params.id;
  var dbId = db.get('transactions').value().map(function(item){return item.id});
  var errors =[];
  if (dbId.includes(inputId)){
    res.redirect('/transactions/'+inputId+'/complete');
  } else {
    errors.push("Something Wrong!");
    res.render('transactions/index.pug',{
      errors: errors,
      trans: db.get('transactions').value()
    })
  }
};

module.exports.complete = function(req,res){
  var postId = req.params.id;
  db.get('transactions').find({id:postId}).assign({isCompleted:true}).write();
  res.redirect('/transactions');
};