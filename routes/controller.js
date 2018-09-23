var express = require("express");
var router  = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get("/", function(req, res){
    res.render("home.ejs");
});
//go to login form
router.get("/login", function(req, res){
    res.render("login.ejs")
});

//go to register form
router.get("/register", function(req, res){
    res.render("register.ejs")
});

//handle register logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            //error usually is user already exist in database
            return res.status(401).json({message:err.message});
        }
        passport.authenticate("local")(req, res, function(){
			res.json({message:"success register user: " + user.username});
        });
    });
});


module.exports = router;