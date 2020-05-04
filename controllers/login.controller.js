var db = require('../db')

module.exports.index = function(req,res,next){
  res.render('login/index')
};

module.exports.postLogin = function(req,res,next){
  var email = req.body.email;
  var password = req.body.password;
  
  var user = db.get('users').find({email:email}).value();
  console.log(user);
  if (!user){
    res.render('login/index',{
      errors: [
        'User does not exist'
      ],
      values: req.body
    })
    return;
  }
  if (user.password !== password){
    res.render('login/index',{
      errors: [
        'Wrong password'
      ],
      values: req.body
    })
    return;
  }
  res.cookie('userId',user.id);
  res.redirect('/');
};
// module.exports.loginTransaction = function(req,res){
//   var email = req.body.email;
//   var name = db.get('users').find({email:email}).value();
//   var tran = db.get('transactions').filter({userId:name.name}).value();
//   res.cookie('userID',name.userId);
//   res.redirect('/');
// };