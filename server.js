const { appExperss, db } = require("./config.js");
const router = require("./routes/index.js");

const server = appExperss.listen(
  3001,
  console.log("server is running port 3001")
);

appExperss.use(router);
