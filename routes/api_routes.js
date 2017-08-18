//these routes need auth
const swiftMailer = require('../mailers/mail_methods');
const User = require('../models/user');

module.exports = (swiftRouter) => {

  //create a user
  swiftRouter.post('/createUser', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    User.findOne({email: email})
      .then((user) => {
        if(user){
          res.json({success: false, message: 'User with same email already exists'});
        } else {
          const new_user = new User({ email: email, password: password});
          new_user.save()
            .then((user) => {
              res.json({success: true, message: 'User created successfully'});
              //viper.spit();
              //todo
              //send verification and welcome email
              swiftMailer('welcome_user', {});
            })
            .catch((err) => {
              res.json({success: false, message: 'User could not be created.'})
              //viper.spit();
            })
        }
      })
  })

  //get a user by email
  swiftRouter.get('/getUserByEmail', (req, res) => {
    User.findOne({ email: req.params.email })
      .then((user) => {
        res.json(user);
        //viper.spit();
      })
      .catch((err) => {
        res.send(err);
        //viper.spit();
      })
  })

  //get all users
  swiftRouter.get('/users', (req, res) => {
    User.find({})
      .then((users) => {
        res.json(users);
        //viper.spit();
      })
      .catch((err) => {
        res.send(err);
        //viper.spit();
      });
  });

  swiftRouter.get('/', (req, res) => {
    res.json({ message: 'SwiftApi!' });
  });

}
