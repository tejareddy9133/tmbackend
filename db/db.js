const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connection = mongoose.connect(dotenv.config().parsed.Mongo_URL);

module.exports = connection;
