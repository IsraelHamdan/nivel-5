/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import ControleLivro from "../../controller/ControleLivros";
import { useEffect, useState } from "react";

import "./index.css";
import LinhaLivro from "./LinhaLivro";
import Livro from "../../model/Livro";

const LivroLista = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState<boolean>(false);
  const controleLivros = new ControleLivro();

  useEffect(() => {
    const obterLivros = async () => {
      try {
        const livrosData = await controleLivros.obterLivros();
        setLivros(livrosData);
        setCarregado(true);
      } catch (error) {
        throw new Error(`Erro ${error} ao obter livros`);
      }
    };
    obterLivros();
  }, [controleLivros]);

  const excluir = async (codigo: string) => {
    try {
      const excluido = await controleLivros.excluir(codigo);
      if (excluido) {
        const livrosAtuais = livros.filter((livro) => livro._id !== codigo);
        setLivros(livrosAtuais);
      }
    } catch (error) {
      throw new Error(`Erro ${error} ao excluir o livro`);
    }
  };
  return (
    <div className="container-xxl mx-3">
      <h1 className="h1">Catalogo de Livros disponiveis</h1>
      <main className="flex-row">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Título</th>
              <th scope="col">Resumo</th>
              <th scope="col">Autores</th>
              <th scope="col">Editora</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro, index) => (
              <LinhaLivro key={index} livro={livro} excluir={excluir} />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;
