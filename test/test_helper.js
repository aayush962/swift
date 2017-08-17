const mongoose = require('mongoose');
const config = require('../config');

//connect to mongodb
mongoose.connect(config.DB);

mongoose.connection
  .once('open', () => console.log('Connected to SwiftDB'))
  .on('error', (error) => console.warn('Connection to SwiftDB failed', error));
