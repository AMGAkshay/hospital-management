const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const multer = require("multer");
const path = require("path");

const mongoose = require("mongoose");
require("dotenv").config();
const auth = require("./middlewares/auth");

// app.use(dotenv);
const UserRouter = require("./Routers/UserRouter");
app.use(bodyParser.json());

app.use("/auth", UserRouter);

app.get("/getall", auth, (res) => {
  res.send("getting all posts");
});

// image upload
let FileName = "";
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const FilePath = path.join(__dirname, "./assests");
    cb(null, FilePath);
  },
  filename: (req, file, cb) => {
    console.log(file);
    FileName = Date.now() + "-" + file.originalname;
    cb(null, FileName);
  },
});

var upload = multer({ storage: storage });
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.body);
  res.send("Hello Upload images");
});

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3000, function () {
  console.log("listening on 3000");
});
