var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.status(401).json({message:"you must login inorder to check profile"});
}

module.exports = middlewareObj;