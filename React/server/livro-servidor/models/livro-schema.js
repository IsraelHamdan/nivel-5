const mongoose = require("mongoose");
const banco = require("./conexao.js");
require("dotenv").config();

const LivroSchema = new banco.Schema({
  _id: banco.Schema.Types.ObjetID,
  titulo: String,
  resumo: String,
  autores: [String],
  codEditora: Number,
});

const Livro = mongoose.model("Livro", LivroSchema, "livros");

module.exports = banco.model(Livro);
