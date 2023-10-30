import React, { useState, useEffect } from "react";
import ControleLivros from "../../controle/ControleLivros";
import ControleEditora from "../../controle/ControleEditora";

import "./index.css";

interface Livro {
  codigo: number;
  titulo: string;
  resumo: string;
  autores: string[];
  codEditora: number;
}

interface LinhaLivroProps {
  livro: Livro;
  excluir: (codLivro: number) => void;
}

const LinhaLivro = (props: LinhaLivroProps) => {
  const controleEditora = new ControleEditora();
  const controleLivros = new ControleLivros();
  const nomeEditora = controleEditora.getNomeEditora(props.livro.codEditora);

  return (
    <tr className="flex">
      <td>
        <p>{props.livro.titulo}</p>
      </td>
      <td>
        <p>{props.livro.resumo}</p>
      </td>
      <td>
        <ul>
          {props.livro.autores.map((autor: string, index: number) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
      <td className="flex-row">
        {nomeEditora}
        <button
          className="btn btn-danger btn-sm"
          onClick={() => props.excluir(props.livro.codigo)}>
          Excluir
        </button>
      </td>
    </tr>
  );
};

const LivroLista = () => {
  const controleLivros = new ControleLivros();
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState<boolean>(false);

  useEffect(() => {
    const livrosDoControlador = controleLivros.obterLivros();
    setLivros(livrosDoControlador);
    setCarregado(true);
  });

  const excluir = (codigoLivro: number) => {
    controleLivros.excluir(codigoLivro);
    setCarregado(false);
  };

  return (
    <main className="container mx-3">
      <h1 className="my-3">Lista de Livros</h1>
      <table id="tabela" className="table table-bordered">
        <thead className="table-dark">
          +
          <tr>
            <th id="tabela-livro_titulo" className="col-sm-2">
              Titulo
            </th>
            <th id="tabela-livro_titulo" className="col-sm-4">
              Resumo
            </th>
            <th id="tabela-livro_titulo" className="col-sm-3">
              Editora
            </th>
            <th id="tabela-livro_titulo" className="col-sm-1">
              Autores
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {livros.map((livro) => (
            <LinhaLivro key={livro.codigo} livro={livro} excluir={excluir} />
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default LivroLista;
