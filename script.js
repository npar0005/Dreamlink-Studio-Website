const http = require("http");
const path = require("path");
const express = require("express");
const dotevn = require("dotenv");
dotevn.config(); // load anythign in a dotenv into an environment variable

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

app.use(express.urlencoded({     // to support URL-encoded bodies (from forms)
  extended: true
})); 

app.use(express.static(path.join(__dirname, 'public')));

app.post('/sendMail', (req, res, next) => {
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