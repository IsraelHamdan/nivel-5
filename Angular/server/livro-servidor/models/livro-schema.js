const banco = require("./conexao");

const livroSchema = new banco.Schema({
  _id: banco.Types.ObjectId,
  codEditora: Number,
  titulo: String,
  resumo: String,
  autores: [String],
});

const Livro = banco.model("livros", livroSchema);

module.exports = Livro;
