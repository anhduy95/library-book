const shortid = require('shortid');
var db = require('../db.js');

module.exports.index = function(req,res){
   res.render('users/index.pug',{
     listUsers: db.get('users').value()
   })
};
module.exports.add = function(req,res){
  res.render('users/create.pug');
};
module.exports.create = function(req,res){
  var id = shortid.generate();
  var inputName = req.body.name;
  var errors = [];
  if (inputName.length < 30){
    db.get('users').push({id: id, name: inputName}).write();
    res.redirect('/users')  
  } else {
    errors.push("Tên quá dài")
    res.render('users/index.pug',{
      listUsers: db.get('users').value(),
      errors: errors
   })
  }
  
};
module.exports.delete = function(req,res){
  var id = req.params.id;
  db.get('users').remove({id:id}).write();
  res.redirect('/users');
};
