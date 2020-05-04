var db = require('../db');

module.exports.isAdminUser = function(req,res,next){
  var user = db.get('users').find({id:req.cookies.userId}).value();
  var errors = [];
  if (user.isAdmin === false){
    errors.push('This action need administration');
    res.render('users/index',{
      errors:errors,
      listUsers: db.get('users').value(),
    })
    return
  };
  next();
}
module.exports.isAdminTran = function(req,res,next){
  var user = db.get('users').find({id:req.cookies.userId}).value();
  if (user.isAdmin === false){
    res.render('transactions/index',{
      trans: db.get('transactions').filter({userId:user.name}).value()
    })
    return
  };
  next();
}
module.exports.isAdminTranCreate = function(req,res,next){
  var user = db.get('users').find({id:req.cookies.userId}).value();
  var users = [];
  users.push(user);
  if (user.isAdmin === false){
    res.render('transactions/create.pug',{
      users: users,
      books: db.get('books').value()
    })
    return
  };
  next();
}
module.exports.isAdminTranDone = function(req,res,next){
  var user = db.get('users').find({id:req.cookies.userId}).value();
  var errors = [];
  if (user.isAdmin === false){
    errors.push('This action need administration');
    res.render('transactions/index',{
      errors:errors,
      trans: db.get('transactions').filter({userId:user.name}).value()
    })
    return
  };
  next();
}