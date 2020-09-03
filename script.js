const path = require("path");
const express = require("express");
const dotevn = require("dotenv");
dotevn.config(); // load anything in a dotenv into an environment variable
const exphbs = require('express-handlebars');
const app = express();

const router = require('./router');
const PORT = process.env.PORT || 80;

// Set the view template engine to use handlebars, and make it use a default layout of the file name 'main'
// Main will be the layout which wraps everything for us. 
app.engine('hbs', exphbs({
  defaultLayout: 'main', 
  extname: 'hbs',
  helpers: require("./handlebars/helpers.js")
}));
app.set('view engine', 'hbs');


app.use(express.urlencoded({ // to support URL-encoded bodies (from forms)
  extended: true
})); 

// Needed to serve static files such as .css, images etc.
app.use(express.static(path.join(__dirname, 'public')));
// Add router-level middleware - Route routes to the router
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
