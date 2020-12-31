const router = require("express").Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const { authValidation } = require("../validation");
const User = require("../models/user.model");

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const { error } = authValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userExist = await User.findOne({ username: username });
  if (userExist) return res.status(400).send("User already exist");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = new User({
    username: username,
    password: hashPassword,
  });
  const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);
  try {
    const savedUser = await user.save();
    res.send({ token: token });
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const { error } = authValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ username: username });
  if (!user) return res.status(400).send("username does not exist");

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);

  res.header("auth-token", token).send({ token: token });
});

module.exports = router;
