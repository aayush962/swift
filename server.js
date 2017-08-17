const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config')

const app = express();

const User = require('./models/user');

//connect to mongodb
mongoose.connect(config.DB);

mongoose.connection
  .once('open', () => console.log('Connected to SwiftDB'))
  .on('error', (error) => console.warn('Connection to SwiftDB failed', error));

app.listen(config.PORT, () => {
  console.log('swift server running on port ' + config.PORT)
})
