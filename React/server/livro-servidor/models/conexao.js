const banco = require("mongoose");

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const mongoUrl = "mongodb://0.0.0.0:27017/";

banco
  .connect(mongoUrl, options)
  .then(() => {
    console.log("Conexão realizada com sucesso");
  })
  .catch((e) => {
    console.error(`Erro na conexão com o db: ${e}`);
  });

module.exports = banco;
