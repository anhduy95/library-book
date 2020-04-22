const express = require("express");
const app = express();
const bodyParser = require('body-parser');

var list = ["đi chợ", "nấu cơm", "rửa bát", "học code tại CoderX"];

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.render("index.pug");
});

app.get("/todos", (request, response) => {
  response.render("./todolist/index.pug", {
    list: list
  });
});

app.get("/todos/search", (request, response) => {
  var q = request.query.q;
  var matchedList = list.filter(function(item) {
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
  list.push(req.body.name);
  // console.log(req.body);
  res.redirect('/todos')
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
