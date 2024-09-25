const { db } = require("../../config");
const { set, ref, get } = require("firebase/database");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const createUser = (req, res) => {
  const saltRounds = 10;
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
              id: uuidv4(),
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              userName: req.body.userName,
              email: req.body.email,
              type: 2,
              password: hash,
              confirm: 0,
            })
              .then(async (data) => {
                let transporter = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                    user: "catadvisorpj@gmail.com",
                    pass: "iffv vyfu ynsg qjjq",
                  },
                });
                let info = await transporter.sendMail({
                  from: '"Cat Advisor" <catadvisor@gmail.com>',
                  to: req.body.email,
                  subject: "Please confirm your membership registration.",
                  html:
                    "<h1>Please confirm your membership registration Please   <a href='http://localhost:3001/confirmUser?" +
                    req.body.userName +
                    "'>link</a> to complete your membership registration. </h1>",
                });
                console.log("info---------Email", info);
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

const getUser = (req, res) => {
  try {
    get(ref(db, "user/" + req.body.userName)).then((data) => {
      if (data.exists()) {
        bcrypt.compare(
          req.body.password + "catAdvisor",
          data.val().password,
          function (err, result) {
            if (result === true) {
              if (data.val().confirm === 0) {
                return res.status(200).json({
                  code: 200,
                  message: "please confirm user from your E-mail",
                  data: null,
                });
              } else {
                return res.status(200).json({
                  code: 200,
                  message: "get success",
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
          message: "get not found",
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

const confirmUser = (req, res) => {};

module.exports = {
  createUser,
  getUser,
};
