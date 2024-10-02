const { db } = require("../../config");
const { set, ref, get, update, remove } = require("firebase/database");
const { v4: uuidv4 } = require("uuid");

const createCatData = (req, res) => {
  const id = uuidv4();

  set(ref(db, "users/catData/" + req.body.createBy + "/" + id), {
    id: id,
    imgCat: req.body.imgCat,
    genderCat: req.body.genderCat,
    birthDateCat: req.body.birthDateCat,
    nameCat: req.body.nameCat,
    breedCat: req.body.breedCat,
    createBy: req.body.createBy,
    updateBy: "",
    createDate: new Date(),
    updateDate: "",
  })
    .then(async (data) => {
      return res.status(200).json({
        code: 200,
        message: "create success",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        code: 500,
        message: err.message,
      });
    });
};

const getCatByUser = (req, res) => {
  get(ref(db, "users/catData/" + req.query.userName)).then(async (data) => {
    if (data.exists()) {
      return res.status(200).json({
        code: 200,
        message: "success",
        data: data.val(),
      });
    } else {
      return res.status(200).json({
        code: 200,
        message: "user not found",
        data: null,
      });
    }
  });
};
const deleteCat = (req, res) => {
  remove(
    ref(db, "users/catData/" + req.query.userName + "/" + req.query.id)
  ).then((data) => {
    try {
      return res.status(200).json({
        code: 200,
        message: "success",
        data: null,
      });
    } catch (err) {
      return res.status(500).json({
        code: 500,
        message: err.message,
      });
    }
  });
};

module.exports = {
  createCatData,
  getCatByUser,
  deleteCat,
};
