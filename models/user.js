const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Company = require('./company');

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  admin: Boolean
  // company: ObjectId(Company)
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
