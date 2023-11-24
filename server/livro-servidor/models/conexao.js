const banco = require("mongoose");

const mongoUrl = "mongodb://0.0.0.0:27017/";

const conectOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

try {
  banco.connect(mongoUrl, conectOptions);
  console.log("Conectado com o DB");
} catch (err) {
  console.error(`: ${err} ao conectar com o DB`);
}

module.exports = banco;
