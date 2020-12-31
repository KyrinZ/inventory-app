const router = require("express").Router();
var jwt = require("jsonwebtoken");

let History = require("../models/history.model");
const verify = require("../verifyToken");

router.get("/", verify, (req, res) => {
  const user = jwt.verify(req.header("auth-token"), process.env.TOKEN_SECRET);

  History.find({ userId: user.userId })
    .sort("date")
    .then((histories) => {
      res.json(histories);
    })
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
