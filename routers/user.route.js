var express = require('express');
var router = express.Router();
const shortid = require('shortid');

var db = require('../db.js');

 router.get('/',(req,res)=>{
   res.render('users/index.pug',{
     listUsers: db.get('users').value()
   })
 })
router.get('/add',(req,res)=>{
  res.render('users/create.pug');
});
router.post("/create",(req,res)=>{
  var id = shortid.generate();
  db.get('users').push({id: id, name: req.body.name}).write();
  
  res.redirect('/users')
});
router.get('/:id/delete',(req,res)=>{
  var id = req.params.id;
  db.get('users').remove({id:id}).write();
  res.redirect('/users');
});

module.exports = router;