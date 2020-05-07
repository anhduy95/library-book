const bcrypt = require('bcrypt');
var db = require('../db')
var sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.index = function(req,res,next){
    res.render('login/index')
};

module.exports.postLogin = function(req,res,next){
  var email = req.body.email;
  var password = req.body.password;  
  var user = db.get('users').find({email:email}).value();
  var numberLogin = user.wrongLoginCount;
  var numberCount = db.get('users').value().map((user)=>{return user.wrongLoginCount});
  for (var count of numberCount){
    console.log(count);
    if( count >= 4){
      const msg = {
        to: 'buifanhduy@gmail.com', // cái này đáng lẽ phải là user.email nhưng sợ gửi nhầm mail
        from: 'buianhduy76@gmail.com',
        subject: 'Warning!',
        text: ' Cảnh báo về tình trạng đăng nhập',
        html: 'Bạn đã nhập sai mật khẩu quá nhiều lần, nếu hành động này k phải của bạn vui lòng liên hệ với chúa để được trợ giúp',
      };
      sgMail.send(msg);
      return
    }
  }
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
      res.cookie('userId',user.id,{
        signed: true
      });
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