const mongoose = require("mongoose");
require("dotenv").config();

const banco = mongoose.createConnection(process.env.MONGO_URI, {
  useUndefinedTopology: true,
  useNewUrlParser: true,
});

module.exports = banco;
