const { getDatabase } = require("firebase/database");
const { initializeApp } = require("firebase/app");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const appExperss = express();
appExperss.use(bodyParser.json());
appExperss.use(bodyParser.urlencoded({ extended: true }));
appExperss.use(express.json());
appExperss.use(
  cors({
    origin: "*", // อนุญาตเฉพาะ React app ที่รันบน localhost:3000
    methods: ["GET", "POST", "PUT", "DELETE"], // ระบุวิธีที่อนุญาต
    //allowedHeaders: ["Content-Type", "Authorization"], // ระบุ headers ที่อนุญาต
  })
);

const firebaseConfig = {
  databaseURL:
    "https://dbcatadvisor-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const appFirebase = initializeApp(firebaseConfig);
const db = getDatabase(appFirebase);

module.exports = {
  db,
  appExperss,
};
