const LivroModel = require("./livro-schema");

const livro = new LivroModel({
  codigo: String,
  codEditora: Number,
  titulo: String,
  resumo: String,
  autores: [String],
});

const incluir = async () => {
  try {
    const novoLivro = new Livro(livro);
    const livroIncluido = await novoLivro.save();
    return livroIncluido;
  } catch (err) {
    console.error(`${err} na tentativa de incluir o livro no DB`);
  }
};

const obterLivros = async () => {
  try {
    const livros = await Livro.find();
    return { data: livros };
  } catch (err) {
    console.error(`${err} na tentativa de obter os livros do DB`);
  }
};

const excluir = async (codigo) => {
  try {
    const livroExcluido = await Livro.deleteOne({ _id: codigo });
    return livroExcluido;
  } catch (err) {
    console.error(`${err} na tentativa de excluir o livro`);
  }
};

module.exports = { incluir, obterLivros, excluir };
