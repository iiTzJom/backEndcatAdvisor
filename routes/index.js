const { createCat } = require("./catData/createCatData");
const {
  createBlog,
  getListBlog,
  deleteBlog,
  getBlogDetail,
  updateBlogDetail,
} = require("./blog");
const {
  createUser,
  login,
  confirmUser,
  checkDataConfirmUser,
  checkUsernameResetPassword,
  updatePassword,
  updateProfile,
  getProfile,
} = require("./auth");

const { createCatData, getCatByUser, deleteCat } = require("./user/catData");

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
router.put("/updateProfile", updateProfile);
router.get("/getProfile", getProfile);

router.post("/createBlog", createBlog);
router.get("/getBlogList", getListBlog);
router.delete("/deleteBlog", deleteBlog);
router.get("/getBlogDetail", getBlogDetail);
router.put("/updateBlogDetail", updateBlogDetail);

router.post("/createCatData", createCatData);
router.get("/getCatByUser", getCatByUser);
router.delete("/deleteCatByUser", deleteCat);

module.exports = router;
