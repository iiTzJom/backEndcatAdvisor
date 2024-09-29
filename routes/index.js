const { createCat } = require("./catData/createCatData");
const {
  createUser,
  login,
  confirmUser,
  checkDataConfirmUser,
} = require("./auth");
var express = require("express");
var router = express.Router();

/* GET home page. */

// router.post("/createCatdata", createCat);
router.post("/createUser", createUser);
router.get("/getUser", login);
router.put("/confirmUser", confirmUser);
router.get("/checkDataConfirmUser", checkDataConfirmUser);
module.exports = router;
