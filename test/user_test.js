const assert = require('assert');
const User = require('../models/user');

describe('Create User', () => {
  it('save a new user', () => {
    const aayush = new User({ name: 'aayush'});
    aayush.save();
  });
});
