const router = require("express").Router();

let History = require("../models/history.model");

router.route("/").get((req, res) => {
  History.find()
    .sort("date")
    .then((histories) => {
      res.json(histories);
    })
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
