const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 80;
httpServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, './public')));
app.get('/', express.static(path.join(__dirname, './public')));
