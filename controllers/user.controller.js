var shortid = require('shortid');
var bcrypt = require('bcrypt');
var cloudinary = require('cloudinary').v2;

var db = require('../db');
var User = require('../models/user.model');

cloudinary.config({ 
  cloud_name: process.env.CLOUND_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

module.exports.index = function(req, res) {
  var users = db.get('users').value();
  var adminUser = db.get('users').find({ userId: req.signedCookies.userId  }).get('isAdmin').value();
  var user = db.get('users').find({ userId: req.signedCookies.userId }).value();
  
  var page = req.query.page ? parseInt(req.query.page) : 1;
  var perPage = 5;
  
  var start = (page - 1) * perPage;
  var end = page * perPage;  
  var lengthPage = Math.ceil(users.length / perPage);
  
  if (adminUser) {
    res.render('users/index', {
      users: users.slice(start, end),
      page,
      lengthPage
    });
    return;
  }
  
  if (user) {
    res.render('users/index', {
      users: [ user ]
    });
    return;
  }
};

module.exports.search = function(req, res) {
  var q = req.query.q;
  var matchedUser = db.get('users').value().filter((user) => {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  
  res.render('users/index', {
    users: matchedUser
  });
};

module.exports.create = function(req, res) {
  var hash = bcrypt.hashSync('123123', 5);

  res.render('users/create', {
    hashedPassword: hash
  });
};

module.exports.delete = function(req, res) {
  var id = req.params.userId;
  
  db.get('users')
    .remove({ userId: id })
    .write();
  
  res.redirect('/users');
};

module.exports.profile = function(req, res) {
  res.render('users/profile');
};

module.exports.getUpdate = function(req, res) {
	var id = req.params.userId;

	var user = db.get('users').find({ userId: id }).value();

	res.render('users/update', {
		user: user,
    userId: id
	});
};

module.exports.postCreate = function(req, res) {
  req.body.userId = shortid.generate();
  
  db.get('users')
    .push(req.body)
    .write();
  
  res.redirect('/users');
};

module.exports.postUpdate = function(req, res) {
  var id = req.body.userId;
  
  db.get('users')
    .find({ userId: id })
    .assign({ name: req.body.name })
    .write();
  
  res.redirect('/users');
};

module.exports.postAvatar = async function(req, res) {
  var id = req.body.userId;
  
  var user = db
    .get('users')
    .find({ userId: id})
    .value();
  
  var file = await cloudinary.uploader.upload(req.file.path, 
    function(error, result) {console.log(result, error)});
  
  if (!user.avatar) {
    db.get('users')
      .find({ userId: id })
      .set('avatar', file.url)
      .write();
  } else {
    db.get('users')
      .find({ userId: id })
      .assign({ avatar: file.url })
      .write();
  }
  
  res.redirect('/users/profile');
};