const express = require("express");

const app = express();

const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

require("dotenv").config();

const PORT = process.env.PORT || 5030;

const loginRoute = require("./routes/login.route");
const apiRoute = require("./routes/api.route");
const homeRoute = require("./routes/home.route");
const accountRoute = require("./routes/account.route");
const postRoute = require("./routes/post.route");
const auth = require("./middleware/auth.middleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

    res.setHeader("Access-Control-Allow-Credentials", true);

    next();
});

// mongoose
//     .connect(process.env.MONGO, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         app.listen(PORT, () => console.log(`server is start at port: ${PORT}`));
//         console.log("connect database successfully");
//     })
//     .catch((err) => console.log(err));
app.use(express.static(__dirname + "/views"));
app.use("/", loginRoute);
app.use("/home", auth.requireAuth, homeRoute);
app.use("/api", apiRoute);
app.use("/account", auth.requireAuth, accountRoute);
app.use("/post", auth.requireAuth, postRoute);

app.listen(PORT, () => console.log(`server is start at port: ${PORT}`));
