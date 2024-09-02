const mongoose = require("mongoose");
const dotenv = require("dotenv");
console.log("");
console.log();
const connection = mongoose.connect(dotenv.config().parsed.Mongo_URL);

module.exports = connection;
