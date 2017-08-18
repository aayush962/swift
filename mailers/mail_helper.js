const nodemailer = require("nodemailer");

const allmailer = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "hodor@gmail.com",
        pass: "yoohoo"
    }
});

module.exports = allmailer;
