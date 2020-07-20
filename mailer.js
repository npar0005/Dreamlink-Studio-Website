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
  // emailConf: {from, to, subject, text, ?html}
  return (emailConf) => transporter.sendMail(emailConf);
}

module.exports = init;