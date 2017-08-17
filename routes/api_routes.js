//these routes need auth
const User = require('../models/user');

module.exports = (swiftRouter) => {

  swiftRouter.get('/users', (req, res) => {
    User.find({})
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.send(err);
      });
  });

  swiftRouter.get('/', (req, res) => {
    res.json({ message: 'SwiftApi' });
  });

}
