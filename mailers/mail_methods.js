const mailer = require('./mail_helper');
const welcomeUserMail = require('./welcome_user.js')

module.exports = (type, options) => {
  switch(type) {
    case 'welcome_user':
      mailer.sendMail(welcomeUserMail, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
      });
      break;
    default:
      console.log('mailer default');
  };
};
