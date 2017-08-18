const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;


const Company = require('./company');

const UserSchema = new Schema({
  name: String,
  email: {type: String, required: true},
  password: {type: String, required: true},
  admin: Boolean,
  isActive: Boolean,
  companies: [{type: Schema.Types.ObjectId, ref: 'Company'}],
  tasks_assigned: [{type: Schema.Types.ObjectId, ref: 'Task'}]
});

UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) return next(err);

      // hash the password along with our new salt
      bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
