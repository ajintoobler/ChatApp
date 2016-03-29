// grab the things we need
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chatapplication')
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    senderName: { type: String },
    ReciverName: { type: String }
    DateTime: { type: Date }
});

// the schema is useless so far
// we need to create a model using it
var UserLogin = mongoose.model('userlogin', userSchema);



// make this available to our users in our Node applications
module.exports.UserLogin = UserLogin;
module.exports.UserDetail = UserDetail;