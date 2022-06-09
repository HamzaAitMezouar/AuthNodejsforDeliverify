
const mongoose  = require("mongoose");


// Npm install multer to add files
const userSchema = mongoose.Schema({
    name : { type : String } ,
    email : { type : String } ,
    password: { type : String }
} );
const User = mongoose.model('User' , userSchema);
module.exports = User ;