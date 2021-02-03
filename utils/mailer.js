const nodemailer = require("nodemailer");
require("dotenv").config();

function init({host, port, secure, user, pass}) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: host, // TODO: remove `.mail` from email in .env
    port: port, // TODO: 465 in production
    secure: secure, // true for 465, false for other ports (true in production)
    auth: {
      user,
      pass 
    },
    // TSL Remove in production
    ...(process.env.NODE_ENV === "production" || {tls: {
      rejectUnauthorized: false
    }})
  });

  // Closure to close over the transporter we made into an asyn utility function, can be called in main
  // emailConf: {from, to, cc, bcc, subject, text, html, attachments}
  return (emailConf) => transporter.sendMail(emailConf);
}

// Function from: https://stackoverflow.com/a/46181/5648954
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = {
  init,
  validateEmail
};
