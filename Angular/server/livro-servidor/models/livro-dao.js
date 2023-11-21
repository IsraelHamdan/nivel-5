const LivroModel = require("./livro-schema");

const livro = new LivroModel({
  codigo: String | null,
  codEditora: Number,
  titulo: String,
  resumo: String,
  autores: [String],
});

const incluir = async (livro) => {
  try {
    const novoLivro = new LivroModel(livro);
    console.log("🚀 ~ file: livro-dao.js:14 ~ incluir ~ novoLivro:", novoLivro);
    const livroIncluido = await novoLivro.save(livro);
    return livroIncluido;
  } catch (err) {
    console.error(`Erro ${err} na tentativa de incluir o livro no DB`);
  }
};

const obterLivros = async () => {
  try {
    const livros = await LivroModel.find();
    return { data: livros };
  } catch (err) {
    console.error(`${err} na tentativa de obter os livros do DB`);
  }
};

const excluir = async (codigo) => {
  try {
    const livroExcluido = await LivroModel.deleteOne({ _id: codigo });
    return livroExcluido;
  } catch (err) {
    console.error(`${err} na tentativa de excluir o livro`);
  }
};

module.exports = { incluir, obterLivros, excluir };
