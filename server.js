const express = require("express");
const app = express();

const bodyParser = require('body-parser');

const shortid = require('shortid');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ todos:[] })
  .write();


app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.render("index.pug");
});

app.get("/todos", (request, response) => {
  response.render("./todolist/index.pug", {
    list: db.get('todos').value()
  });
});

app.get("/todos/search", (request, response) => {
  var q = request.query.q;
  var matchedList = db.get('todos').value().filter(function(item) {
    return item.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  response.render("todolist/index.pug", {
    list: matchedList,
    input: q
  });
});

app.get("/todos/create", (req, res) => {
  res.render('todolist/create.pug')
});

app.post("/todos/create",(req,res)=>{
  var id = shortid.generate();
  db.get('todos').push({id: id, text: req.body.name}).write();
  
  res.redirect('/todos')
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
