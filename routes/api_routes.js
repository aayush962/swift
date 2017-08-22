// these routes need auth
// const swiftMailer = require('../mailers/mail_methods');
// const viper = require('viper-logger');
const User = require('../models/user');
const Company = require('../models/company');
const Invite = require('../models/invite');
const Project = require('../models/project');

module.exports = (swiftRouter) => {

  //Project Routes -------------------------------------------------------------

  //get projects for a company
  swiftRouter.get('/getProjectsByCompany', (req, res) => {
    const company_id = req.query.company_id;
    if(company_id){
      Company.findById(company_id)
        .populate('projects')
        .then((company) => {
          res.json({success: true, projects: company.projects});
        })
        .catch((err) => {
          res.json({success: false, message: 'Company by that id not found'})
        });
    } else{
      res.json({success: false, message: 'Please provide company id'})
    }
  });

  //add members to project
  // swiftRouter.post('/addMembersToProject', (req, res) => {
  //
  // });


  //create a new project
  swiftRouter.post('/createProject', (req, res) => {
    const title = req.body.title;
    const company_id = req.body.company_id;
    const email = req.body.email;
    User.findOne({email: email})
      .then((user) => {
        if(!user){
          res.json({success: false, message: 'User with given email not found.'})
        } else{
          const new_project = new Project({title: title, creator: user})

          new_project.save()
            .then((project) => {
              //user.projects.push(project);
              //user.save();
              Company.findById(company_id)
                .then((company) => {
                  company.projects.push(project);
                  company.save()
                  project.company = company;
                  project.save()
                    .then((project) => {
                      res.json({success: true, message: 'Project saved successfully', project: project})
                    })
                    .catch((err) => {
                      res.json({success: false, message: 'Project could not be created.'})
                    })
                })
                .catch((err) => {
                  res.json({success: false, message: 'Project could not be created.'})
                })
            })
            .catch((err) => {
                res.json({success: false, message: 'Project could not be created.'})
            });
        }
      })
      .catch((err) => {
        res.send(err);
      });
  });

  //Invite Routes -------------------------------------------------------------

  //invite or add members to company
  swiftRouter.post('/inviteMembersToCompany', (req, res) => {
    const emails = req.body.emails;
    const company_id = req.body.company_id;
    emails.map((email) => {
      User.findOne({email:email})
        .then((user) => {
          if(!user){
            const invite = new Invite({email: email, created_at: new Date, isActive: true});
            invite.save();
          } else{
            Company.findById(company_id)
              .then((company) => {
                user.companies.push(company);
                user.save();
              });
          }
        })
        .catch((err) => {
          res.send(err);
        });
    });
    res.json({success: true, message: 'Invites sent'});
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
    const name = req.body.name;
    const size = req.body.password;
    const creator_email = req.body.creator_email;
    User.findOne({email: creator_email})
      .then((user) => {
        if(!user){
          res.json({success: false, message: 'User with that email not found.'});
        } else {
          const new_company = new Company({ name: name, size: size, creator: user, created_at: new Date});
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

  //get all companies for a user by email
  swiftRouter.get('/getCompaniesForUser', (req, res) => {
    const email = req.query.email;
    User.findOne({email: email}).populate('companies')
      .then((user) => {
        if(!user){
          res.json({success: false, message: 'No user found with that email.'})
        } else {
          res.json({success: true, companies: user.companies})
        }
      })
      .catch((err) => {
        res.send(err);
      });
  })

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
    User.findOne({ email: req.query.email })
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
