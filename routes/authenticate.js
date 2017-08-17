//authenticate a client
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');

module.exports = (swiftRouter) => {
  //authentication route
  swiftRouter.post('/authenticate', (req, res) => {
    if(req.body.password && req.body.email){
      User.findOne({ email: req.body.email })
        .then((user) => {
          if(!user){
            res.json({ success: false, message: 'Authentication failed. No user found with that email'});
          } else if(user){
            if(user.password != req.body.password){
              res.json({success: false, message: 'Authentication failed. Wrong credentials.'})
            } else{
              const token = jwt.sign(user, config.SECRET);
              res.json({success: true, message: 'Authenticated successfully!', token: token})
            };
          };
        })
        .catch((err) => {
          console.log(err);
          //viper.spit('/api/authenticate');
        });
    } else{
      res.json({success: false, message: "Credentials not provided!"});
    }
  });
};
