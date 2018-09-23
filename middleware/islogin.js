var middlewareObj = {};
var passport = require("passport");

//check if user is loggin or not
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.status(401).json({message:"error! you must login inorder to check profile"});
}


// middleware to check if user is logged in and  is admin or not
middlewareObj.isAdmin = function(req, res, next){
    if(!req.user){
        //user is not login 
        return res.status(401).json({message:"error! you must login as admin in order to check database"});
    }else if( req.user.username === "admin"){
        return next();
    }else{
        return res.status(401).json({message:"error! you must login as admin inorder to check database"});
    }
}

module.exports = middlewareObj;