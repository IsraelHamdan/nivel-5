import { useState, useEffect } from "react";
import ControleLivros from "../../controle/ControleLivros";

import LinhaLivro from "./LinhaLivro";

import "./index.css";

interface Livro {
  codigo: string;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

const LivroLista = () => {
  const controleLivros = new ControleLivros();
  const [livros, setLivros] = useState<Livro[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [carregado, setCarregado] = useState<boolean>(false);

  useEffect(() => {
    controleLivros.obterLivros().then((livrosdoControlador) => {
      setLivros(livrosdoControlador);
      setCarregado(true);
    });
  });

  const excluir = (codigoLivro: number) => {
    controleLivros.excluir(codigoLivro).then(() => {
      setCarregado(false);
    });
  };

  return (
    <main className="container-xxl">
      <h1 className="h1 my-3">Tabel de LivroLista</h1>
      <table id="tabela" className="table table-borded">
        <thead className="table-dark">
          <tr>
            <th id="tabela-livro_titulo" className="col-sm-2">
              Titulo
            </th>
            <th id="tabela-livro_titulo" className="col-sm-4">
              Resumo
            </th>
            <th id="tabela-livro_titulo" className="col-sm-3">
              Autores
            </th>
            <th id="tabela-livro_titulo" className="col-sm-1">
              Editora
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
