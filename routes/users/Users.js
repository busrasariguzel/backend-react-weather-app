var express = require("express");
var router = express.Router();
var userController = require("./controllers/userController");
var jwtHelper = require("../users/authHelpers/jwtHelper");
var userController = require("../users/controllers/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/create-user", userController.createuser);

router.post("/login", userController.login);

router.get("/logout", userController.logout);

//protected API - the jsobwebtoken is the help our server to identify who you are
router.get(
  "/refresh-token",
  jwtHelper.customJWTRefreshVerify,
  jwtHelper.findUserIfUserExist,
  jwtHelper.hasAuthorization,
  userController.createNewJWTAndRefreshToken
);

module.exports = router;