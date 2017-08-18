//these routes need auth
//const swiftMailer = require('../mailers/mail_methods');
const User = require('../models/user');
const Company = require('../models/company');
const Invite = require('../models/invite');

module.exports = (swiftRouter) => {

  //Invite Routes -------------------------------------------------------------

  //invite members to company
  swiftRouter.post('/inviteMembersToCompany', (req, res) => {
    const emails = req.body.emails;
    const company = req.body.company;
    emails.map((email) => {
      User.findOne({email:email})
        .then((user) => {
          if(!user){
            const invite = new Invite({email: email, created_at: new Date, isActive: true});
            invite.save()
          } else{
            user.companies.push(company);
          }
        })
        .catch((err) => {
          res.send(err);
        });
    });
  });

  //change invite status on invite accept
  swiftRouter.post('/acceptInvite', (req, res) => {
    const id = req.body.id;
    Invite.findById(id)
      .then((invite) => {
        if(!invite){
          res.json({success: false, message: 'Invite with that ID not found.'})
        } else{
          invite.isActive = false;
          invite.save()
            .then((invite) => {
              res.json({success: true, message: 'Invitiation accepted successfully.'})
            })
            .catch((err) => {
              res.json({success: false, message: 'Invitation could not be accepted.'})
            })
        }
      })
      .catch((err) => {
        res.send(err)
      });
  });

  //Company Routes -------------------------------------------------------------

  //create company
  swiftRouter.post('/createCompany', (req, res) => {
    const name = req.body.email;
    const size = req.body.password;
    const creator_email = req.body.creator_email;
    User.findOne({email: creator_email})
      .then((user) => {
        if(!user){
          res.json({success: false, message: 'User with that email not found.'});
        } else {
          const new_company = new Company({ name: name, size: size, creator: user});
          new_company.members.push(user);
          new_company.save()
            .then((company) => {
              user.companies.push(company);
              user.save()
                .then((user) => {
                  res.json({success: true, message: 'Company created successfully', company: company});
                })
                .catch((err) => {
                  res.json({success: false, message: 'Company could not be created!'})
                });
              //viper.spit();
              //todo
              //send verification and welcome email
              //swiftMailer('welcome_user', {});
            })
            .catch((err) => {
              res.json({success: false, message: 'Company could not be created.'})
              //viper.spit();
            });
        }
      })
      .catch((err) => {
        res.send(err);
      });
  });

  //User Routes ----------------------------------------------------------------

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
          const new_user = new User({ email: email, password: password, active: true});
          new_user.save()
            .then((user) => {
              res.json({success: true, message: 'User created successfully', user: user});
              //viper.spit();
              //todo
              //send verification and welcome email
              //swiftMailer('welcome_user', {});
            })
            .catch((err) => {
              res.json({success: false, message: 'User could not be created.'})
              //viper.spit();
            });
        }
      })
      .catch((err) => {
        res.send(err);
      });
  });

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
      });
  });

  //change user isActive status
  swiftRouter.post('/changeUserStatus', (req, res) => {
    User.find({email: req.body.email})
      .then((user) => {
        if(!user){
          res.json({status: true, message: 'User not found with that email.'});
        } else{
          user.isActive = req.body.isActive;
          user.save()
            .then((user) => {
              res.json({status: success, message: 'Status changed to' + user.isActive})
            })
            .catch((err) => {
              res.send(err)
            });
        };
      })
      .catch(() => {
        res.send(err);
      });
  });

  //get all users
  // swiftRouter.get('/users', (req, res) => {
  //   User.find({})
  //     .then((users) => {
  //       res.json(users);
  //       //viper.spit();
  //     })
  //     .catch((err) => {
  //       res.send(err);
  //       //viper.spit();
  //     });
  // });

  swiftRouter.get('/', (req, res) => {
    res.json({ message: 'SwiftApi!' });
  });

}
