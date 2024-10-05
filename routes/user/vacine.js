const { db } = require("../../config");
const { set, ref, get, update, remove } = require("firebase/database");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const sendLineNotification = (req, res) => {
  axios
    .post(
      "https://notify-api.line.me/api/notify",
      new URLSearchParams({
        message: req.body.message,
      }),
      {
        headers: {
          Authorization: `Bearer ${req.body.accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then(async (data) => {
      return res.status(200).json({
        code: 200,
        message: "connect line success",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        code: 500,
        message: err.message,
      });
    });
};

const createVacine = (req, res) => {
  const id = uuidv4();

  set(ref(db, "users/vacine/" + req.body.createBy + "/" + id), {
    id: id,
    idCat: req.body.idCat,
    vacineName: req.body.vacineName,
    vacineDate: req.body.vacineDate,
    vacineNameNext: req.body.vacineNameNext,
    vacineDateNext: req.body.vacineDateNext,
    status: req.body.status,
    createBy: req.body.createBy,
    createDate: new Date(),
  })
    .then(async (data) => {
      return res.status(200).json({
        code: 200,
        message: "create success",
        id: id,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        code: 500,
        message: err.message,
      });
    });
};

const updateVacine = async (req, res) => {
  var updates = {};

  updates[`users/vacine/` + req.body.updateBy + "/" + req.body.id + "/idCat"] =
    req.body.idCat;
  updates[
    `users/vacine/` + req.body.updateBy + "/" + req.body.id + "/vacineName"
  ] = req.body.vacineName;
  updates[
    `users/vacine/` + req.body.updateBy + "/" + req.body.id + "/vacineDate"
  ] = req.body.vacineDate;
  updates[
    `users/vacine/` + req.body.updateBy + "/" + req.body.id + "/vacineNameNext"
  ] = req.body.vacineNameNext;
  updates[
    `users/vacine/` + req.body.updateBy + "/" + req.body.id + "/vacineDateNext"
  ] = req.body.vacineDateNext;
  updates[
    `users/vacine/` + req.body.updateBy + "/" + req.body.id + "/vacineDateNext"
  ] = req.body.vacineDateNext;
  updates[`users/vacine/` + req.body.updateBy + "/" + req.body.id + "/status"] =
    req.body.status;
  updates[
    `users/vacine/` + req.body.updateBy + "/" + req.body.id + "/updateBy"
  ] = req.body.updateBy;
  updates[
    `users/vacine/` + req.body.updateBy + "/" + req.body.id + "/updateDate"
  ] = new Date();

  var updatesNoti = {};
  updatesNoti[`vacineNoti/` + req.body.id + "/idCat"] = req.body.idCat;
  updatesNoti[`vacineNoti/` + req.body.id + "/vacineName"] =
    req.body.vacineName;
  updatesNoti[`vacineNoti/` + req.body.id + "/vacineDate"] =
    req.body.vacineDate;
  updatesNoti[`vacineNoti/` + req.body.id + "/vacineNameNext"] =
    req.body.vacineNameNext;
  updatesNoti[`vacineNoti/` + req.body.id + "/vacineDateNext"] =
    req.body.vacineDateNext;
  updatesNoti[`vacineNoti/` + req.body.id + "/status"] = req.body.status;
  updatesNoti[`vacineNoti/` + req.body.id + "/updateBy"] = req.body.updateBy;
  updatesNoti[`vacineNoti/` + req.body.id + "/updateDate"] = new Date();

  await update(ref(db), updates)
    .then(async (data) => {
      await update(ref(db), updatesNoti)
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
    })
    .catch((err) => {
      return res.status(err.code).json({
        code: err.code,
        message: err.message,
        data: null,
      });
    });
};
const getVacineByUser = (req, res) => {
  get(ref(db, "users/vacine/" + req.query.userName)).then(async (data) => {
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

const getVacineList = (req, res) => {
  get(ref(db, "vacineNoti/")).then(async (data) => {
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

const createVacineNoti = (req, res) => {
  set(ref(db, "vacineNoti/" + req.body.idVacine), {
    id: req.body.idVacine,
    idCat: req.body.idCat,
    accessToken: req.body.accessToken,
    vacineName: req.body.vacineName,
    vacineDate: req.body.vacineDate,
    vacineNameNext: req.body.vacineNameNext,
    vacineDateNext: req.body.vacineDateNext,
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

const deleteVacine = (req, res) => {
  remove(
    ref(db, "users/vacine/" + req.query.userName + "/" + req.query.id)
  ).then((data) => {
    try {
      remove(ref(db, "vacineNoti/" + req.query.id)).then((data) => {
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
    } catch (err) {
      return res.status(500).json({
        code: 500,
        message: err.message,
      });
    }
  });
};

const updateTokken = (req, res) => {
  var updates = {};
  updates[`user/${req.body.userName}/accessToken`] = req.body.accessToken;

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
  sendLineNotification,
  updateTokken,
  createVacine,
  createVacineNoti,
  getVacineByUser,
  deleteVacine,
  updateVacine,
  getVacineList,
};
