const mongoose = require("mongoose");
const banco = require("./conexao");

const LivroSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  codEditora: Number,
  titulo: String,
  resumo: String,
  autores: [String],
});

const Livro = banco.model("Livro", LivroSchema);

module.exports = Livro;
