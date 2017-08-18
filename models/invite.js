const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InviteSchema = new Schema({
  email: String,
  created_at: Date,
  isActive: Boolean
});

const Invite = mongoose.model('Invite', InviteSchema);

module.exports = Invite;
