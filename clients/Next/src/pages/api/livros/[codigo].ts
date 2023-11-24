/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import ControleLivros from "@/classes/controles/ControleLivros";

const controleLivro = new ControleLivros();

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    try {
      const codigo = Number(req.query.codigo);
      if (isNaN(codigo)) {
        res.status(400).json({
          error: "Código invalido",
        });
      } else {
        // const livroExcluido = controleLivro.excluir(codigo);
        console.log(codigo);
        controleLivro.excluir(codigo);
        res.status(200).json({
          message: `Livro excluido!`,
        });
      }
    } catch (error) {
      res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  } else {
    res.status(405).json({
      error: "Médodo não petmitido ",
    });
  }
};
