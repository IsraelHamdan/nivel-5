const { default: mongoose } = require("mongoose");
const banco = require("./conexao");
require("dotenv").config();

const LivroSchema = new banco.Schema({
  _id: banco.Schema.Types.ObjectId,
  titulo: String,
  codEditora: Number,
  resumo: String,
  autores: [String],
});

const Livro = mongoose.model("livro", LivroSchema);

module.exports = Livro;
