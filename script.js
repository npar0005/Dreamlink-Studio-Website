const http = require("http");
const path = require("path");
const express = require("express");
const dotevn = require("dotenv");
dotevn.config(); // load anythign in a dotenv into an environment variable
const exphbs = require('express-handlebars');

// Own modules
const {init: initNodeMailer, validateEmail} = require("./utils/mailer.js");
const helpers = require("./handlebars/helpers.js");

const sendMail = initNodeMailer({
  host: process.env.SMTP_HOST,
  user: process.env.EMAIL_ADDR,
  pass: process.env.EMAIL_PASS
});

const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 80;
httpServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Set the view template engine to use handlebars, and make it use a default layout of the file name 'main'
// Main will be the layout which wraps everything for us. 
app.engine('hbs', exphbs({
  defaultLayout: 'main', 
  extname: 'hbs',
  helpers
}));
app.set('view engine', 'hbs');


app.use(express.urlencoded({ // to support URL-encoded bodies (from forms)
  extended: true
})); 

// Needed to serve static files such as .css, images etc.
app.use(express.static(path.join(__dirname, 'public')));

// Homepage route
app.get('/', (_, res) => {
  res.render('index', {title: 'Home'});
});

app.get('/about', (_, res) => {
  res.render('about', {title: 'About', noshrink: true});
});

app.get('/products', (_, res) => {
  res.render('products', {title: 'Products', noshrink: true});
});

app.get('/contact', (_, res) => {
  res.render('contact', {title: 'Conact', noshrink: true});
});

app.get('*', (_, res) => {
  res.status(404).send("Cannot find page!");
});

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

app.post('/sendmail', validateContactPage, async (req, res) => {
  try {
    const {firstName, lastName, email, emailBody} = req.body;
    const info = await sendMail({
      from: `Website Contact Form 🌙 <${process.env.EMAIL_ADDR}>`,
      to: email || process.env.EMAIL_ADDR, // TODO: Change this
      bcc: email,
      subject: `Website query from ${firstName} ${lastName}`,
      text: `${firstName} ${lastName} has sent the following from the dreamlinkstudio.com website:\n${emailBody}`
    });
    res.json({error: false, id: info.messageId});
  } catch(err) {
    res.json({error: true, msg: "Internal error with sending email"});
  }
});

app.post('/contact-form', validateContactPage, async (req, res) => {
  const {category, firstname, surname, email, message} = req.body;
  try {
    const info = await sendMail({
      from: `Website Contact Page 🌙<${process.env.EMAIL_ADDR}>`,
      to: email || process.env.EMAIL_ADDR, // TODO: Change this
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
    res.json({error: true, msg: "Internal error with sending email"});
  }
});