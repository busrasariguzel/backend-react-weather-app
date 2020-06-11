var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("req.auth", req.auth);

  console.log("req.profile", req.profile);

  res.send("------");
});

module.exports = router;
