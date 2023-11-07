import { useState, useEffect } from "react";
import ControleLivro from "../../controle/ControleLivros";
import ControleEditora from "../../controle/ControleEditora";
import Livro from "../../modelo/Livro";

const controleLivros = new ControleLivro("http://localhost:3030/livros");
const controleEditora = new ControleEditora();

interface LinhaLivroProps {
  livro: Livro;
  excluir: (codigo: string) => void;
  getNomeEditora: (codEditora: number) => string | undefined;
}

const LinhaLivro = (props: LinhaLivroProps) => {
  const { livro, excluir, getNomeEditora } = props;
  const nomeEdiora = getNomeEditora;

  return (
    <tr>
      <td>
        <p>{livro.titulo}</p>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => excluir(livro.codigo)}>
          excluir
        </button>
      </td>
      <td>{livro.resumo}</td>
      <td>{nomeEdiora(livro.codEditora)}</td>
      <td>
        <ul>
          {livro.autores.map((autor: string, index: number) => {
            <li key={index}>{autor}</li>;
          })}
        </ul>
      </td>
    </tr>
  );
};
