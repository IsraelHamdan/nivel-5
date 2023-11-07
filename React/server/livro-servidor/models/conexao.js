const mongoose = require("mongoose");
require("dotenv").config();

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const mongoUri = process.env.MONGO_URI;

try {
  mongoose
    .connect(mongoUri, options)
    .then(() => {
      console.log("Conexão realizada!");
    })
    .catch((error) => {
      console.error(`Erro na conexão com o banco: ${error}`);
    });
} catch (error) {
  console.error(`Erro na conexão com o banco: ${error}`);
}

module.exports = mongoose;
