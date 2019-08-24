const mongoose= require('mongoose');
const bcrypt = require('bcrypt');

var friendSchema=  mongoose.Schema({
  FirstName: {type: String, required: true},
  LastName: { type: String, required: true},
  Email: { type: String, required: true},
  Phone:{type: Number} ,
  Photo: String
});

var Friend = mongoose.model('Friend', friendSchema);

module.exports.Friend =Friend;
