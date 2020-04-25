const express = require("express");
const app = express();
var bodyParser = require('body-parser');
var userRouter = require('./routers/user.route');

var db = require('./db.js');

const shortid = require('shortid');

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine','pug');
app.set('views','./views');

app.use(express.static("public"));

app.use('/users', userRouter);

app.get("/", (req, res) => {
  res.render('index.pug');
});
 app.get('/list',(req,res)=>{
   res.render('books/index.pug',{
     books: db.get('books').value()
   })
 })
app.get('/create',(req,res)=>{
  res.render('books/create.pug');
});
app.post("/books/create",(req,res)=>{
  var id = shortid.generate();
  db.get('books').push({id: id, title: req.body.name, des: req.body.description}).write();
  
  res.redirect('/list')
});
app.get('/books/:id/delete',(req,res)=>{
  var id = req.params.id;
  db.get('books').remove({id:id}).write();
  res.redirect('/list');
})

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
