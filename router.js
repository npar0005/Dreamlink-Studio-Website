const express = require("express");
const router = express.Router();
const dotevn = require("dotenv");
dotevn.config(); // load anything in a dotenv into an environment variable
// Own modules
const {init: initNodeMailer, validateEmail} = require("./utils/mailer.js");
const teamData = require("./handlebars/team_data.json");

const sendMail = initNodeMailer({
  host: process.env.SMTP_HOST,
  port: +process.env.EMAIL_PORT,
  secure: process.env.SECURE === "true",
  user: process.env.EMAIL_ADDR,
  pass: process.env.EMAIL_PASS
});

// Homepage route
router.get('/', (_, res) => {
  res.render('index', {title: 'Home', teamData});
});

router.get('/about', (_, res) => {
  res.render('about', {title: 'About', teamData, noshrink: true});
});

router.get('/products', (_, res) => {
  res.render('products', {title: 'Products', noshrink: true});
});

router.get('/contact', (_, res) => {
  res.render('contact', {title: 'Contact', noshrink: true});
});

router.get('*', (_, res) => {
  res.redirect("/");
});


// Posts
const validateContactPage = (req, res, next) => {
  const values = Object.values(req.body);
  if(!values.every(s => s.trim())) { // check all entries have a value
    return res.json({error: true, msg: 'Invalid form inputs!'})
  } 

  if(!validateEmail(req.body.email)) { // ensure email is of the correct format
    return res.json({error: true, msg: 'Invalid email address!'});
  }
  next();
}

router.post('/sendmail', validateContactPage, async (req, res) => {
  try {
    const {firstName, lastName, email, emailBody} = req.body;
    const info = await sendMail({
      from: `Website Contact Form 🌙 <${process.env.EMAIL_ADDR}>`,
      to: process.env.EMAIL_ADDR,
      bcc: email,
      subject: `Website query from ${firstName} ${lastName}`,
      text: `${firstName} ${lastName} has sent the following from the dreamlinkstudio.com website:\n${emailBody}`
    });
    console.log("INFO: ", info);
    res.json({error: false, id: info.messageId});
  } catch(err) {
    console.log(err);
    res.json({error: true, msg: "Internal error with sending email", err});
  }
});

router.post('/contact-form', validateContactPage, async (req, res) => {
  const {category, firstname, surname, email, message} = req.body;
  try {
    const info = await sendMail({
      from: `Website Contact Page 🌙<${process.env.EMAIL_ADDR}>`,
      to: process.env.EMAIL_ADDR,
      bcc: email,
      subject: `${category} - Website Query`,
      html: `
        <h3>${firstname} ${surname} has sent the following from the dreamlinkstudio.com contact page:</h3>
        <p><b>First name:</b> ${firstname}<p>
        <p><b>Surname:</b> ${surname}<p>
        <p><b>Category:</b> ${category}<p>
        <p><b>Email:</b> ${email}<p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `
    });
    res.json({error: false, id: info.messageId});
  } catch(err) {
    //console.log(err);
    res.json({error: true, msg: "Internal error with sending email"});
  }
});

module.exports = router;