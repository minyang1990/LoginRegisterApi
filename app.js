var express = require("express");
var app = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var User = require("./models/user");
var passport    = require("passport");
var LocalStrategy = require("passport-local");
var routeIndex      = require("./routes/controller");

var dburl = "mongodb://niw:n4114510@ds127490.mlab.com:27490/api";
mongoose.connect(dburl, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Passport config
app.use(require("express-session")({
    secret: "secret word",
    resave: false,
    saveUninitialized: false
}));

//check passport api doc
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
//reading data from session then encode or decode
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", routeIndex);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("server start on port " + process.env.PORT);
});