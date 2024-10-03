const { db } = require("../../config");
const { set, ref, get, update, remove } = require("firebase/database");
const { v4: uuidv4 } = require("uuid");

const createBlog = (req, res) => {
  const id = uuidv4();

  set(ref(db, "blogs/" + id), {
    id: id,
    cateId: req.body.cateId,
    title: req.body.title,
    imgCat: req.body.imgCat,
    recommend: req.body.recommend,
    description: req.body.description,
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

const updateBlogDetail = (req, res) => {
  var updates = {};
  updates[`blogs/${req.body.id}/cateId`] = req.body.cateId;
  updates[`blogs/${req.body.id}/title`] = req.body.title;
  updates[`blogs/${req.body.id}/imgCat`] = req.body.imgCat;
  updates[`blogs/${req.body.id}/recommend`] = req.body.recommend;
  updates[`blogs/${req.body.id}/description`] = req.body.description;
  updates[`blogs/${req.body.id}/updateBy`] = req.body.updateBy;
  updates[`blogs/${req.body.id}/updateDate`] = new Date();

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

const getListBlog = (req, res) => {
  get(ref(db, "blogs/")).then((data) => {
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

const getBlogDetail = (req, res) => {
  get(ref(db, "blogs/" + req.query.id)).then((data) => {
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
const deleteBlog = (req, res) => {
  remove(ref(db, "blogs/" + req.query.id)).then((data) => {
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
  createBlog,
  getListBlog,
  getBlogDetail,
  deleteBlog,
  updateBlogDetail,
};
