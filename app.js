require("dotenv").config();

const express = require(`express`);
const session = require("express-session");
const path = require('path');

const { sessionStore } = require("./Util/SessionHandler");
const { dbInit } = require("./Util/DatabaseHandler");

const app = express();

const indexRoute = require("./routes/index");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const logoutRoute = require("./routes/logout");
const productRoute = require("./routes/product");
const checkoutRoute = require("./routes/checkout");
const transaksiRoute = require("./routes/transaksi");
const apiRoute = require("./routes/api");
const globalRoute = require("./routes/global")

dbInit();

app.disable("etag");
//app.set("view-engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 30000,
      expires: false,
      sameSite: "strict",
    },
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
  })
);

app.use(express.json());

app.use("/", indexRoute);
app.use("/api", apiRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/product", productRoute);
app.use("/global", globalRoute);
app.use("/checkout", checkoutRoute);
app.use("/transaksi", transaksiRoute);
app.use("/logout", logoutRoute);

app.listen(5000, console.log("Server is running on http://localhost:5000"));
