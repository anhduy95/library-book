var express = require('express');
var router = express.Router();
const shortid = require('shortid');

var db = require('../db.js');

router.get('/',(req,res)=>{
   res.render('books/index.pug',{
     books: db.get('books').value()
   })
 })
router.get('/create',(req,res)=>{
  res.render('books/create.pug');
});
router.post("/create",(req,res)=>{
  var id = shortid.generate();
  db.get('books').push({id: id, title: req.body.name, des: req.body.description}).write();
  
  res.redirect('/books')
});
router.get('/:id/delete',(req,res)=>{
  var id = req.params.id;
  db.get('books').remove({id:id}).write();
  res.redirect('/books');
})

module.exports = router;