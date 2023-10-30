/* eslint-disable import/no-anonymous-default-export */
import ControleEditora from "@/classes/controles/ControleEditora";
import { NextApiRequest, NextApiResponse } from "next";

const controleEditora = new ControleEditora();

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const editoras = controleEditora.getEditoras();
      res.status(200).json(editoras);
    } catch (error) {
      res.status(500).json({
        error: "Erro 500: erro interno do servidor",
      });
    }
  } else {
    res.status(405).json({
      error: "Método não permitido",
    });
  }
};
