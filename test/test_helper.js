const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;

//connect to mongodb
mongoose.connect(config.DB);

mongoose.connection
  .once('open', () => console.log('Connected to SwiftDB'))
  .on('error', (error) => console.warn('Connection to SwiftDB failed', error));

//runs before each test runs
//empty db
beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    //run next test sfter db becomes empty
    done();
  });
});
