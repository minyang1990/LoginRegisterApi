var express = require("express");
var router  = express.Router();
var User = require("../models/user");
var passport = require("passport");
var middleware = require("../middleware/islogin");

//root url
router.get("/", function(req, res){
    res.render("home.ejs");
});
//go to login form
router.get("/login", function(req, res){
    res.render("login.ejs")
});

//handle login logic below is passport api custom callback
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {return res.status(401).json({message:"error! when login"});}
    if (!user) {return res.status(401).json({message:"error!"+info.message});}
    // Passport exposes a login() function on req that can be used to establish a login session.
    req.logIn(user, function(err) {
        if (err) {return res.status(401).json({message:"error! when login"});}
        return res.json({message:"success login as: " + req.user.username});
    });
  })(req, res, next);
});

//go to register form
router.get("/register", function(req, res){
    res.render("register.ejs")
});

//handle register logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    //Passport-Local Mongoose Convenience method to register a new user instance with a given password. Checks if username is unique.
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            //error usually is user already exist in database
            return res.status(401).json({message:"error!"+err.message});
        }
        passport.authenticate("local")(req, res, function(){
			return res.json({message:"success register user: " + user.username});
        });
    });
});

//use middleware to protect profile api endpoint
router.get("/profile", middleware.isLoggedIn, function(req, res){
    return res.json({message:"profile: username is: " + req.user.username});
})

//use middleware isAdmin to protect database api endpoint
router.get("/database",middleware.isAdmin, function(req, res){
    User.find({},function(err, results) {
        if (err) return res.status(401).json({message:"error when login"});	
        return res.json({database:results});
    })
})

// logout logic
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});


module.exports = router;