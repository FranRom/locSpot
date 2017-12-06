require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const location = require('./routes/locationAPI');
const review = require('./routes/reviewAPI');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const apiFor = require('./routes/api');
const cors = require('cors');
const app = express();

mongoose.connect(process.env.DB_URL).then(() =>{
  console.log(`Connected to DB: ${process.env.DB_URL}`);
});

var whitelist = [
    'http://localhost:4200',
];
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
app.use(cors(corsOptions));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'Fockin awesome project brah',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}));


require('./passport')(app);

app.use('/api/auth', auth);
app.use('/api/location', location);
app.use('/api/review', review);
app.use('/api/user', apiFor(require('./models/User')));


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

module.exports = app;
