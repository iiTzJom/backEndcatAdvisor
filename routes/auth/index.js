const { db } = require("../../config");
const { set, ref, get, update } = require("firebase/database");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "catadvisorpj@gmail.com",
    pass: "iffv vyfu ynsg qjjq",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
const saltRounds = 10;
const createUser = (req, res) => {
  const id = uuidv4();
  get(ref(db, "user/" + req.body.userName)).then((data) => {
    if (data.exists()) {
      return res.status(200).json({
        code: 200,
        message: "This username has been registed",
        data: null,
      });
    } else {
      bcrypt.hash(req.body.password + "catAdvisor", saltRounds, (err, hash) => {
        if (err) {
          return res.status(500).json({
            code: 500,
            message: err.message,
          });
        } else {
          try {
            set(ref(db, "user/" + req.body.userName), {
              id: id,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              userName: req.body.userName,
              email: req.body.email,
              accessToken: "",
              type: 2,
              password: hash,
              confirm: 0,
            })
              .then(async (data) => {
                let info = await transporter.sendMail({
                  from: '"Cat Advisor" <catadvisor@gmail.com>',
                  to: req.body.email,
                  subject: "Please confirm your membership registration.",
                  html:
                    "<h1>Please confirm your membership registration Please   <a href='http://localhost:3000/confirmUser?" +
                    req.body.userName +
                    "%2f" +
                    id +
                    "'>link</a> to complete your membership registration. </h1>",
                });

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
          } catch (err) {
            return res.status(500).json({
              code: 500,
              message: err.message,
            });
          }
        }
      });
    }
  });
};

const login = (req, res) => {
  try {
    get(ref(db, "user/" + req.query.userName)).then((data) => {
      if (data.exists()) {
        bcrypt.compare(
          req.query.password + "catAdvisor",
          data.val().password,
          function (err, result) {
            if (result === true) {
              if (data.val().confirm === 0) {
                return res.status(200).json({
                  code: 200,
                  message: "please vertify user from your E-mail",
                  data: null,
                });
              } else {
                return res.status(200).json({
                  code: 200,
                  message: "login success",
                  data: data.val(),
                });
              }
            } else {
              return res.status(200).json({
                code: 200,
                message: "password is not correct",
                data: null,
              });
            }
          }
        );
      } else {
        return res.status(200).json({
          code: 200,
          message: "user not found",
          data: null,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

const checkDataConfirmUser = (req, res) => {
  get(ref(db, "user/" + req.query.userName)).then((data) => {
    if (data.exists()) {
      const dataReturn = data.val();
      if (req.query.id !== dataReturn.id) {
        return res.status(200).json({
          code: 400,
          message: "fail",
          data: null,
        });
      } else {
        if (dataReturn.confirm == 0) {
          return res.status(200).json({
            code: 200,
            message: "correct",
            data: null,
          });
        } else {
          return res.status(200).json({
            code: 200,
            message: "success",
            data: null,
          });
        }
      }
    }
  });
};

const confirmUser = (req, res) => {
  var updates = {};
  updates[`user/${req.body.userName}/confirm`] = 1;

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

const getProfile = (req, res) => {
  get(ref(db, "user/" + req.query.userName)).then(async (data) => {
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
const checkUsernameResetPassword = (req, res) => {
  get(ref(db, "user/" + req.query.userName)).then(async (data) => {
    if (data.exists()) {
      let info = await transporter.sendMail({
        from: '"Cat Advisor" <catadvisor@gmail.com>',
        to: data.val().email,
        subject: "Reset password.",
        html:
          "<h1>Please click <a href='http://localhost:3000/resetPassword?" +
          data.val().userName +
          "%2f" +
          data.val().id +
          "'>link</a>for reset password </h1>",
      });
      return res.status(200).json({
        code: 200,
        message: "success",
        data: null,
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

const updatePassword = (req, res) => {
  bcrypt.hash(req.body.password + "catAdvisor", saltRounds, (err, hash) => {
    var updatePassword = {};
    updatePassword[`user/${req.body.userName}/password`] = hash;
    update(ref(db), updatePassword)
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
  });
};

const updateProfile = (req, res) => {
  var updates = {};
  updates[`user/${req.body.userName}/firstName`] = req.body.firstName;
  updates[`user/${req.body.userName}/lastName`] = req.body.lastName;
  updates[`user/${req.body.userName}/imgProfile`] = req.body.imgProfile;
  updates[`user/${req.body.userName}/updateDate`] = new Date();

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
  createUser,
  login,
  confirmUser,
  checkDataConfirmUser,
  checkUsernameResetPassword,
  updatePassword,
  updateProfile,
  getProfile,
};
