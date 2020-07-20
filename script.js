const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 80;
httpServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies (for POST)
  extended: true
})); 

app.use(express.static(path.join(__dirname, './public')));
app.get('/', express.static(path.join(__dirname, './public')));
app.post('/sendMail', (req, res) => {
  const {firstName, lastName, email, emailBody} = req.body;
  let error = Object.values(req.body).some(val => !val.trim());

  if(!error) {
    // try and send email...

    // if error, set error to false.
  }

  res.json({
    error
  });
})