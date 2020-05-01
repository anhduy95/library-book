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
  db.get('users').push({id: id, name: req.body.name}).write();
    res.redirect('/users') 
};
module.exports.delete = function(req,res){
  var id = req.params.id;
  db.get('users').remove({id:id}).write();
  res.redirect('/users');
};
