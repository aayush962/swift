const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const config = require('./config');
const app = express();
const User = require('./models/user');

const swiftRouter = express.Router();
const authenticate = require('./routes/authenticate')(swiftRouter);
const middleware = require('./routes/middleware')(swiftRouter);
const apiRoutes = require('./routes/api_routes')(swiftRouter);


//connect to mongodb
mongoose.connect(config.DB);

mongoose.connection
  .once('open', () => console.log('Connected to SwiftDB'))
  .on('error', (error) => console.warn('Connection to SwiftDB failed', error));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.get('/setup', (req, res) => {
  const aayush = new User({ email: 'aayush962@gmail.com', password: 'password', admin: true});
  aayush.save()
    .then((user) => {
      res.json({ success: true });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/', (req, res) => {
  res.send('SwiftServer!')
})

app.use('/api', swiftRouter);

app.listen(config.PORT, () => {
  console.log('swift server running on port ' + config.PORT)
})
