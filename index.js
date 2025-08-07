const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const { Join } = require("path");

require("dotenv").config();

const HOST = process.env.HOST_URL || "localhost";
const PORT = process.env.HOST_PORT || 3000;

const useragent = require("express-useragent");
const app = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//Enable cors
app.use(cors());
app.options("*", cors());

app.use(useragent.express());

app.use((req, res, next) => {
  const originalJson = res.json;
  res.json = function (body) {
    res.locals.responseJson = body;
    originalJson.call(res, body);
  };
  next();
});

const v1Route = require("./routes/v1");
const adminRoute = require("./routes/admin");

app.use("/api/v1", v1Route);
app.use("/api/admin", adminRoute);

app.use("/", (req, res) => {
  return res.json({ message: "Welcome to medicine order api project." });
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
