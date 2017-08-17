const assert = require('assert');
const User = require('../models/user');

describe('Read User', () => {

  let aayush;

  beforeEach((done) => {
    aayush = new User({name: 'aayush'});
    aayush.save()
      .then(() => done());
  });

  it('finds all users with name aayush', (done) => {
    User.find({ name : 'aayush' })
      .then((users) => {
        console.log(users);
        //assert(users[0]._id.toString() == joe._id.toString());
        done();
      });
  });
});
