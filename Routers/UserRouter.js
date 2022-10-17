const router = require("express").Router();
const User = require("../modules/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.get("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("user not found");
  const hashedPassword = user.password;

  const result = await bcrypt.compare(password, hashedPassword);
  if (result) {
    // return res.send("successfully logged into your acount!!");
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    res
      .header({ Auth: token })
      .status(200)
      .send({ username: user.firstname, email: user.email });
  } else {
    return res.status(400).send("Incorrect password!!");
  }
});

router.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const checkedUser = await User.findOne({ email: req.body.email });
  if (checkedUser !== null)
    return res.status(400).send("user already exists!!");
  //   res.send(checkedUser);
  //   if (checkedUser) return res.send("user already exists!!");
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    contact: req.body.contact,
    email: req.body.email,
    password: hashedPassword,
  });
  user
    .save()
    .then(() => {
      res.status(201).json({
        user: user,
      });
    })
    .catch((error) => {
      let keys = Object.keys(error.errors);
      res
        .status(400)
        .send({ error: error.errors[keys[0]].message, target: keys[0] });
    });
});



module.exports = router;
