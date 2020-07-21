const nodemailer = require("nodemailer");

function init({host, user, pass}) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: host,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user,
      pass, 
    },
    tls: {
      rejectUnauthorized: false
    }
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
