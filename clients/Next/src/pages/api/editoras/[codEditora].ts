/* eslint-disable import/no-anonymous-default-export */
import ControleEditora from "@/classes/controles/ControleEditora";
import { NextApiRequest, NextApiResponse } from "next";

const controleEditora = new ControleEditora();

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const codEditora = Number(req.query.codEditora);
      console.log("🚀 ~ file: [codEditora].ts:12 ~ codEditora:", codEditora);
      const isInvalidCod = isNaN(codEditora);

      const nomeEditora = isInvalidCod
        ? null
        : controleEditora.getNomeEditora(codEditora);

      res.status(isInvalidCod ? 400 : nomeEditora ? 200 : 404).json({
        error: isInvalidCod
          ? "Paremetro não encontrado "
          : !nomeEditora
          ? "Editora não encontrada"
          : undefined,
        nome: nomeEditora,
      });
    } catch (error) {
      res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  } else {
    res.status(405).json({
      error: "Metodo não permitido",
    });
  }
};
