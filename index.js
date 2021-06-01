const express = require("express");

const app = express();

const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const loginRoute = require("./routes/login.route");
const apiRoute = require("./routes/api.route");
const homeRoute = require("./routes/home.route");
const auth = require("./middleware/auth.middleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(function (_, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`server is start at port: ${PORT}`));
    console.log("connect database successfully");
  })
  .catch((err) => console.log(err));

app.set("view engine", "hbs");

app.use(express.static(__dirname + "/views"));
app.use("/", loginRoute);
app.use("/home", auth.requireAuth, homeRoute);
app.use("/api", apiRoute);
