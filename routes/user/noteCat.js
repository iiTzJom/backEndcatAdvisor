const { db } = require("../../config");
const { set, ref, get, update, remove } = require("firebase/database");
const { v4: uuidv4 } = require("uuid");

const createCatNote = (req, res) => {
  const id = uuidv4();

  set(ref(db, "users/catNote/" + req.body.createBy + "/" + id), {
    id: id,
    idCat: req.body.idCat,
    nameNote: req.body.nameNote,
    noteDate: req.body.noteDate,
    text: req.body.text,
    createBy: req.body.createBy,
    createDate: new Date(),
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

const getCatNoteByUser = (req, res) => {
  get(ref(db, "users/catNote/" + req.query.userName)).then(async (data) => {
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

const deleteCatNote = (req, res) => {
  remove(
    ref(db, "users/catNote/" + req.query.userName + "/" + req.query.id)
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

const updateCatNote = (req, res) => {
  var updates = {};
  updates[`users/catNote/` + req.body.updateBy + "/" + req.body.id + "/idCat"] =
    req.body.idCat;
  updates[
    `users/catNote/` + req.body.updateBy + "/" + req.body.id + "/nameNote"
  ] = req.body.nameNote;
  updates[
    `users/catNote/` + req.body.updateBy + "/" + req.body.id + "/noteDate"
  ] = req.body.noteDate;
  updates[`users/catNote/` + req.body.updateBy + "/" + req.body.id + "/text"] =
    req.body.text;
  updates[
    `users/catNote/` + req.body.updateBy + "/" + req.body.id + "/updateBy"
  ] = req.body.updateBy;
  updates[
    `users/catNote/` + req.body.updateBy + "/" + req.body.id + "/updateDate"
  ] = new Date();

  update(ref(db), updates)
    .then((data) => {
      return res.status(200).json({
        code: 200,
        message: "Update Success",
        data: null,
      });
    })
    .catch((err) => {
      return res.status(err.code).json({
        code: err.code,
        message: err.message,
        data: null,
      });
    });
};

module.exports = {
  createCatNote,
  getCatNoteByUser,
  deleteCatNote,
  updateCatNote,
};
