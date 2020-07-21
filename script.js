const http = require("http");
const path = require("path");
const express = require("express");
const dotevn = require("dotenv");
dotevn.config(); // load anythign in a dotenv into an environment variable
const exphbs = require('express-handlebars');

// Own modules
const {init: initNodeMailer, validateEmail} = require("./utils/mailer.js");
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
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ // to support URL-encoded bodies (from forms)
  extended: true
})); 


// Homepage route
app.get('/', (req, res) => {
  res.render('index', {title: 'Home'});
});

// Needed to serve static files such as .css, images etc.
app.use(express.static(path.join(__dirname, 'public')));

app.post('/sendmail', (req, res, next) => {
  let error = Object.values(req.body).some(val => !val.trim());
  if(error) {
    return res.json({error, msg: 'Invalid form inputs!'});
  }

  if(!validateEmail(req.body.email)) {
    return res.json({error: true, msg: 'Invalid email address!'});
  }
  next();
}, async (req, res) => {
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
    res.json({error: true, msg: "Error with sending email"})
  }
});