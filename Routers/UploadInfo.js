const auth = require("../middlewares/auth");
const router = require("express").Router();
const upload = require("../multer");
const hospitalInfo = require("../modules/Hospital");
const users = require("../modules/User");
const jwt = require("jsonwebtoken");

router.post("/uploadinfo", auth, upload.array("image"), async (req, res) => {
  // console.log(req.user);
  //   console.log(req.files);
  const userId = req.user.user_id;
  const filenameArr = [];
  req.files.map((file) => {
    filenameArr.push(file.originalname);
  });
  const hospitalObj = new hospitalInfo({
    images: filenameArr,
    user: userId,
  });
  //   res.send(hospitalObj);
  try {
    const savedHospobj = await hospitalObj.save();
    res.send(savedHospobj);
  } catch (err) {
    console.log(err);
  }
});

router.get("/getall", auth, async (req, res) => {
  const allposts = await hospitalInfo.find();
  // console.log(allposts);
  const user = req.user;

  const token = req.header("x-access-token");
  console.log(token);
  res.send(allposts);
});

router.get("/getuserbytoken", (req, res) => {
  const token = req.header("x-access-token");
  res.send(req.user);
});

module.exports = router;

// router.get("/find", async (req, res) => {
//   const user = await users.findById("635f8f3a76989a894112b57c");
//   console.log(user);
//   res.send("hello");
// });

// app.post("/upload", upload.array("image"), async (req, res) => {
//   console.log(req.files);
//   req.files.map((file) => {
//     console.log(file.originalname);
//   });
//   res.send("Image uploaded successfully!!");
// });
