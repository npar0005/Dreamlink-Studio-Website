const http = require("http");
const path = require("path");
const express = require("express");
const dotevn = require("dotenv");
dotevn.config(); // load anythign in a dotenv into an environment variable

// Own modules
const initNodeMailer = require("./mailer.js");
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

app.use(express.urlencoded({     // to support URL-encoded bodies (for POST)
  extended: true
})); 

app.use(express.static(path.join(__dirname, 'public')));
app.post('/sendMail', async (req, res) => {
  const {firstName, lastName, email, emailBody} = req.body;
  let error = Object.values(req.body).some(val => !val.trim());

  if(!error) {
    sendMail({
      from: `Website Contact Form 🌙 <${process.env.EMAIL_ADDR}>`,
      to: email || process.env.EMAIL_ADDR, // TODO: Change this
      subject: `Website query from ${firstName} ${lastName}`,
      text: `${firstName} ${lastName} has sent the following from the dreamlinkstudio.com website:\n${emailBody}`
    })
    .then(info => console.log(info.messageId))
    .catch(err => console.error(err));
  }

  res.json({
    error
  });
})