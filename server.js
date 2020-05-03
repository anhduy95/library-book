const express = require("express");
const app = express();
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRouter = require('./routers/user.router');
var bookRouter = require('./routers/book.router');
var transactionRouter = require('./routers/transaction.router');
var loginRouter = require('./routers/login.router');

var middleware = require('./middleware/auth.middleware');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());

app.set('view engine','pug');
app.set('views','./views');

app.get('/',(req,res)=>{
  res.cookie("Duy",1234);
  res.render('index.pug');
});

var count=0;
function cookieCount(req,res,next){
  count++;
  console.log(req.cookies,":",count);
  next();
}

app.use('/users',middleware.auth, cookieCount, userRouter);

app.use('/books', cookieCount, bookRouter);

app.use('/transactions',middleware.auth, cookieCount, transactionRouter);

app.use('/login', loginRouter);

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
