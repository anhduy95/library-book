const bcrypt = require('bcrypt');
var db = require('../db')

module.exports.index = function(req,res,next){
    res.render('login/index')
};

module.exports.postLogin = function(req,res,next){
  var email = req.body.email;
  var password = req.body.password;  
  var user = db.get('users').find({email:email}).value();
  var numberLogin = user.wrongLoginCount;
  var numberCount = db.get('users').value().map((user)=>{return user.wrongLoginCount});
  // for (var count in numberCount){
  //   if( count >= 4){
  //     res.render('login/index',{
  //       errors:[
  //         'Hack?'
  //       ]
  //     })
  //     return
  //   }
  // }
  if (!user){
    res.render('login/index',{
      errors: [
        'User does not exist'
      ],
      values: req.body
    })
    return;
  }
  bcrypt.compare(password, user.password, function(err, result) {
    if(result == true) {
      db.get('users').find({email:email}).assign({wrongLoginCount:0}).value();
      res.cookie('userId',user.id);
      res.redirect('/');
    } else {
      numberLogin += 1;
      db.get('users').find({email:email}).assign({wrongLoginCount:numberLogin}).value();
      res.render('login/index',{
        errors: [
          'Wrong password'
        ],
        values: req.body
      })
      return;
    }
  });
}