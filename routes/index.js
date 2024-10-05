const {
  createCatBreedData,
  getListCatBreeds,
  deleteCatBreeds,
  getCatBreedsDetail,
  updateCatBreeds,
  getCatUser,
} = require("./catData");
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

const {
  createCatData,
  getCatByUser,
  deleteCat,
  updateCatByUser,
} = require("./user/catData");

const {
  createCatNote,
  getCatNoteByUser,
  deleteCatNote,
  updateCatNote,
} = require("./user/noteCat");

const {
  sendLineNotification,
  updateTokken,
  createVacine,
  createVacineNoti,
  getVacineByUser,
  deleteVacine,
  updateVacine,
  getVacineList,
} = require("./user/vacine");

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
router.put("/updateCatByUser", updateCatByUser);

router.post("/createCatNote", createCatNote);
router.get("/getCatNoteByUser", getCatNoteByUser);
router.delete("/deleteCatNote", deleteCatNote);
router.put("/updateCatNote", updateCatNote);

router.post("/createCatBreedData", createCatBreedData);
router.get("/getListCatBreeds", getListCatBreeds);
router.delete("/deleteCatBreeds", deleteCatBreeds);
router.put("/updateCatBreeds", updateCatBreeds);
router.get("/getCatBreedsDetail", getCatBreedsDetail);
router.get("/getCatUser", getCatUser);

router.post("/sendLineNotification", sendLineNotification);
router.put("/updateTokken", updateTokken);
router.post("/createVacine", createVacine);
router.post("/createVacineNoti", createVacineNoti);
router.get("/getVacineByUser", getVacineByUser);
router.delete("/deleteVacine", deleteVacine);
router.put("/updateVacine", updateVacine);
router.get("/getVacineList", getVacineList);

module.exports = router;
