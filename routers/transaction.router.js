var express = require('express');
var router = express.Router();
const shortid = require('shortid');

var db = require('../db.js');

router.get('/',(req,res)=>{
   res.render('transactions/index.pug',{
     trans: db.get('transactions').value()
   })
 });
router.get('/create',(req,res)=>{
  res.render('transactions/create.pug',{
    users: db.get('users').value(),
    books: db.get('books').value()
  })
})

router.post("/create",(req,res)=>{
  var id = shortid.generate();
  db.get('transactions').push({id:id,...req.body}).write();
  
  res.redirect('/transactions')
});

module.exports = router;