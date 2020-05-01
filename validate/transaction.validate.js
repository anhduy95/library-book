var db = require('../db.js');

module.exports.checkId = function(req,res,next){
  var inputId = req.params.id;
  var dbId = db.get('transactions').value().map(function(item){return item.id});
  var errors =[];
  if (!dbId.includes(inputId)) {
    errors.push("Something Wrong!");
    res.render("transactions/index.pug",{
      errors: errors,
      trans: db.get('transactions').value()
    })
    return;
  }
  next();
};