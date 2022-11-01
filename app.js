const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const uploadInfo = require("./Routers/UploadInfo");
require("dotenv").config();
// below for add authorization for particular route
// const auth = require("./middlewares/auth");

// app.use(dotenv);
const UserRouter = require("./Routers/UserRouter");
app.use(bodyParser.json());

// middlewares
app.use("/auth", UserRouter);
app.use("/", uploadInfo);

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3000, function () {
  console.log("listening on 3000");
});
