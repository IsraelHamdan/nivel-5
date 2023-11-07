const express = require("express");
const router = express.Router();
const livroDados = require("../models/livro-dados");

router.get("/", async (req, res) => {
  try {
    const livros = await livroDados.obterLivros();
    res.json(livros);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/cadastro", async (req, res) => {
  try {
    const novoLivro = req.body;
    console.log(novoLivro);
    const livroSalvo = await livroDados.incluir(novoLivro);
    res.json(livroSalvo);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.delete("/:codigo", async (req, res) => {
  const codigo = req.params.codigo;
  try {
    const resultado = await livroDados.excluir(codigo);
    res.json({ message: resultado });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
