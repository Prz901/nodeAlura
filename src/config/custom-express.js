// Allow Node.js to require and load `.marko` files
require("marko/node-require").install();
require("marko/express");

const express = require("express");
const app = express();
const bodyParse = require("body-parser");

app.use("/estatico", express.static("src/app/public"));

app.use(
  bodyParse.urlencoded({
    extended: true
  })
);

const rotas = require("../app/rotas/rotas");
rotas(app);

module.exports = app;
