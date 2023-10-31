const Livro = require("./livro-schema");

const obterLivros = async () => {
  try {
    const incluir = await Livro.find();
    return incluir;
  } catch (error) {
    throw new Error(`Erro ao obter livros: ${error.message}`);
  }
};

const incluir = async (livro) => {
  try {
    const novoLivro = new Livro(livro);
    const livroSalvo = await novoLivro.save();
    return livroSalvo;
  } catch (error) {
    throw new Error(`Erro ao incluir o livro: ${error.message}`);
  }
};

const excluir = async (codigo) => {
  try {
    const resultado = await Livro.deleteOne({
      _id: codigo,
    });
    if (resultado.deletedCount === 1) {
      return `Livro de código ${codigo} excluído!!`;
    } else {
      return `Nenhum livro encontrado com o código ${codigo}, possivelmente ele não exista no db, ou já tenha sido excluído`;
    }
  } catch (error) {
    throw new Error(`Erro ao incluir o livro: ${error.message}`);
  }
};

module.exports = { Livro, obterLivros, incluir, excluir };
