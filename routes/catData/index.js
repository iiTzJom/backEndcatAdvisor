const { db } = require("../../config");
const { set, ref, get, remove, update } = require("firebase/database");
const { v4: uuidv4 } = require("uuid");

const createCatBreedData = (req, res) => {
  const id = uuidv4();

  set(ref(db, "catBreeds/" + id), {
    id: id,
    imgGeneral: req.body.imgGeneral,
    textGeneral: req.body.textGeneral,
    nameTH: req.body.nameTH,
    nameEN: req.body.nameEN,
    scoreCharacter: req.body.scoreCharacter,
    scorePersistence: req.body.scorePersistence,
    scoreFriendliness: req.body.scoreFriendliness,
    scoreFurCare: req.body.scoreFurCare,
    imgBody: req.body.imgBody,
    textBody: req.body.textBody,
    imgPersonalTraits: req.body.imgPersonalTraits,
    textPersonalTraits: req.body.textPersonalTraits,
    imgGeneticDisease: req.body.imgGeneticDisease,
    textGeneticDisease: req.body.textGeneticDisease,
    backgroundColor: req.body.backgroundColor,
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

const updateCatBreeds = (req, res) => {
  var updates = {};
  updates[`catBreeds/${req.body.id}/imgGeneral`] = req.body.imgGeneral;
  updates[`catBreeds/${req.body.id}/textGeneral`] = req.body.textGeneral;
  updates[`catBreeds/${req.body.id}/nameTH`] = req.body.nameTH;
  updates[`catBreeds/${req.body.id}/nameEN`] = req.body.nameEN;
  updates[`catBreeds/${req.body.id}/scoreCharacter`] = req.body.scoreCharacter;
  updates[`catBreeds/${req.body.id}/scorePersistence`] =
    req.body.scorePersistence;
  updates[`catBreeds/${req.body.id}/scoreFriendliness`] =
    req.body.scoreFriendliness;
  updates[`catBreeds/${req.body.id}/scoreFurCare`] = req.body.scoreFurCare;
  updates[`catBreeds/${req.body.id}/backgroundColor`] =
    req.body.backgroundColor;
  updates[`catBreeds/${req.body.id}/imgBody`] = req.body.imgBody;
  updates[`catBreeds/${req.body.id}/textBody`] = req.body.textBody;
  updates[`catBreeds/${req.body.id}/imgPersonalTraits`] =
    req.body.imgPersonalTraits;
  updates[`catBreeds/${req.body.id}/textPersonalTraits`] =
    req.body.textPersonalTraits;
  updates[`catBreeds/${req.body.id}/imgGeneticDisease`] =
    req.body.imgGeneticDisease;
  updates[`catBreeds/${req.body.id}/textGeneticDisease`] =
    req.body.textGeneticDisease;
  updates[`catBreeds/${req.body.id}/updateBy`] = req.body.updateBy;
  updates[`catBreeds/${req.body.id}/updateDate`] = new Date();

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

const getListCatBreeds = (req, res) => {
  get(ref(db, "catBreeds/")).then((data) => {
    try {
      const dataReturn = data.val();
      return res.status(200).json({
        code: 200,
        message: "success",
        data: dataReturn,
      });
    } catch (err) {
      return res.status(500).json({
        code: 500,
        message: err.message,
      });
    }
  });
};

const deleteCatBreeds = (req, res) => {
  remove(ref(db, "catBreeds/" + req.query.id)).then((data) => {
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

const getCatBreedsDetail = (req, res) => {
  get(ref(db, "catBreeds/" + req.query.id)).then((data) => {
    try {
      const dataReturn = data.val();
      return res.status(200).json({
        code: 200,
        message: "success",
        data: dataReturn,
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
  createCatBreedData,
  getListCatBreeds,
  deleteCatBreeds,
  getCatBreedsDetail,
  updateCatBreeds,
};
