const express = require("express");
const router = express.Router();
const livroDAO = require("../models/livro-dao");

router.get("/", async (req, res) => {
  try {
    const livros = req.body;
    const livrosObtidosDoDb = await livroDAO.obterLivros(livros);
    if (livrosObtidosDoDb) {
      res.status(200).json({ message: "Livros obtidos do DB" });
      console.log("livros obtidos DB");
    }
  } catch (err) {
    console.error(`${err} erro na tentativa de obter os livros do DB`);
    res.status(500).json({ error: "erro na tentativa de obter os livros " });
  }
});

router.post("/", async (req, res) => {
  try {
    const livro = req.body;
    const livroIncluidoNoDB = await livroDAO.incluir(livro);
    if (livroIncluidoNoDB) {
      res.json({ message: "Livro incluido com sucesso!" });
      console.log(livroIncluidoNoDB);
    }
  } catch (err) {
    res.status(500).json({ error: `Não foi possivel incluir o livro` });
    console.error(`${err} na tentativa de enviar o livro do DB`);
  }
});

router.delete("/:codigo", async (req, res) => {
  try {
    const codigo = req.params.codigo;
    const livroExcluidoNoDB = await livroDAO.excluir(codigo);
    if (livroExcluidoNoDB) {
      res.json({ message: "Livro excluído no DB" });
    }
  } catch (err) {
    console.error(`${err} na tentativa de excluir o livro do db`);
    res.status(500).json({ error: `Não foi possivel excluir o livro ${err}` });
  }
});

module.exports = router;
