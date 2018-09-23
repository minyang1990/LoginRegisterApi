var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
//create schema
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
//check passport-local-mongoose api doc add more method to database object
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);