const { db } = require("../../config");
const { set, ref } = require("firebase/database");
const { v4: uuidv4 } = require("uuid");

function createCat(req, res) {
  try {
    set(ref(db, "user/" + uuidv4()), {
      id: uuidv4(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      type: 2,
    });
    return res.status(200).json({
      code: 200,
      message: "create success",
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
}

module.exports = {
  createCat,
};
