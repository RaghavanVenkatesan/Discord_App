const mongoose = require("mongoose");

const db = mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("database connection failed ", err);
  });

module.exports = db;
