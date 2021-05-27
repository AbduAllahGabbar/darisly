const mongoose = require("mongoose");
const config = require("config");
const logger = require("./logging");

module.exports = function () {
  let db = process.env.MONGODB_URI || "mongodb://localhost:27017/Darisly";

  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info(`The server connecting properly with Mongo DB URL at ${db}`);
    })
    .catch((err) => logger.error("Could not connect to mongo db...", err));
};
