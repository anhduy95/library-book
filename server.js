const express = require("express");
const app = express();
const bodyParser = require('body-parser');
var userRouter = require('./routers/user.router');
var bookRouter = require('./routers/book.router');
var transactionRouter = require('./routers/transaction.router')
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine','pug');
app.set('views','./views');

app.use(express.static("public"));

app.get('/',(req,res)=>{
  res.render('index.pug');
});

app.use('/users', userRouter);

app.use('/books', bookRouter);

app.use('/transactions', transactionRouter);

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
