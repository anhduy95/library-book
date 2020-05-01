var db = require('../db');
module.exports.create = function(req,res,next){
  var inputName = req.body.name;
  var errors = [];
  if (inputName.length > 30){
    errors.push("Tên quá dài")
    res.render('users/index.pug',{
      listUsers: db.get('users').value(),
      errors: errors
    })
    return;
  }
  next();
};