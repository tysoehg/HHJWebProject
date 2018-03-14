var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var server = require("http").Server(app);
var io = require("socket.io")(server);

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";


// Connect to Restaurant Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/restaurant');


// routes for data persistence
var index = require('./routes/index');
var users = require('./routes/users');
var tender = require('./routes/tender'); // fetch tables and menu

/*
var menu = require('./routes/menu');
var tables = require('./routes/tables');
*/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', index);
app.use('/tender', tender);
//app.use('/users', users);
//app.use('/menu', menu);
//app.use('/tables', tables);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.on("connection", function(socket)
{
	console.log("a connection");
	
	socket.on("new order", function(data)
	{
		//console.log(data);
		/*
		MongoClient.connect(url, function(err, db)
		{
			if (err) throw err;
			var dbo = db.db("restaurant");
			dbo.collection("orders").insertOne(data, function(err, res)
			{
				if (err) throw err;
				console.log("inserted an order");
			});
		});
		*/
		io.emit("new order");
	});
});
server.listen(8081, function()
{
	console.log("awaiting updates");
});

module.exports = app;
