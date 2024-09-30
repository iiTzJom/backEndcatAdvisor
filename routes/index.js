const { createCat } = require("./catData/createCatData");
const { createBlog, getListBlog, deleteBlog } = require("./blog");
const {
  createUser,
  login,
  confirmUser,
  checkDataConfirmUser,
  checkUsernameResetPassword,
  updatePassword,
} = require("./auth");
var express = require("express");
var router = express.Router();

/* GET home page. */

// router.post("/createCatdata", createCat);
router.post("/createUser", createUser);
router.get("/login", login);
router.put("/confirmUser", confirmUser);
router.get("/checkDataConfirmUser", checkDataConfirmUser);
router.get("/checkUsernameResetPassword", checkUsernameResetPassword);
router.put("/updatePassword", updatePassword);

router.post("/createBlog", createBlog);
router.get("/getBlogList", getListBlog);
router.delete("/deleteBlog", deleteBlog);
module.exports = router;
