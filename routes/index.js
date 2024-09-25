const { createCat } = require("./catData/createCatData");
const { createUser, getUser } = require("./auth");
var express = require("express");
var router = express.Router();

/* GET home page. */

router.post("/createCatdata", createCat);
router.post("/createUser", createUser);
router.get("/getUser", getUser);

module.exports = router;
