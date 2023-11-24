/* eslint-disable import/no-anonymous-default-export */
import ControleLivros from "@/classes/controles/ControleLivros";
import { NextApiRequest, NextApiResponse } from "next";

const controleLivro = new ControleLivros();

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const livros = controleLivro.obterLivros();
      res.status(200).json(livros);
    } catch (error) {
      res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  } else if (req.method === "POST") {
    try {
      const novoLivro = req.body;
      const livroIncluido = controleLivro.incluir(novoLivro);
      res.status(200).json({
        mensage: "Livro incluido",
      });
    } catch (error) {
      res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  } else {
    res.status(405).json({
      error: "Método não permitido",
    });
  }
};
