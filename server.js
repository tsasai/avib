// modules         =================================================
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var passport       = require('passport');
var flash          = require('connect-flash');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');
var mongoose       = require('mongoose');
var db             = require('./config/db');

var app = express();

// configuration ===========================================
var port = process.env.PORT || 8080; // set our port
mongoose.connect(db.url); // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)
require('./config/passport')(passport); // pass passport for configuration
app.engine('html', require('ejs').renderFile);

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
   // configure stuff here
}

app.set('views', __dirname + '/public');
app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 							// log every request to the console
app.use(cookieParser()); 							// read cookies (needed for auth)
app.use(bodyParser()); 								// pull information from html in POST
app.use(methodOverride()); 							// simulate DELETE and PUT

// required for passport
app.use(session({ secret: 'avibiasdbr00klin' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ==================================================
require('./app/routes')(app, passport); // configure our routes

// start app ===============================================
app.listen(port); // startup our app at http://localhost:8080
console.log('Server running at ' + port); // shoutout to the user
exports = module.exports = app; // expose app
