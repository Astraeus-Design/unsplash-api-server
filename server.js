"use strict";

const express = require("express"); // npm install express
const axios = require("axios");
const logger = require("./middlewares/logger");
const validate = require("./middlewares/validate");
const errorHandler = require("./handlers/500");
const fourofour = require("./handlers/404");
//const routeHandlers = require("./handlers/routeHandlers");
//const { getImages } = require("./handlers/routeHandlers");
const getRandom = require("./handlers/getRandom");
const wildCards = require("./handlers/wildCards");
const getImages = require("./handlers/getImages");

require("dotenv").config(); // npm i dotenv
const DEFAULT_PORT = 3001;
const PORT = process.env.PORT || DEFAULT_PORT;

const app = express();
const cors = require("cors");

app.use(cors());
app.use(logger);

app.get("/searchimage", validate, getImages);
app.get("/randomimage", getRandom);
app.get("*", fourofour, wildCards);

app.use(errorHandler); // final catchall error routine

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

module.exports = {
  app: app,
};
