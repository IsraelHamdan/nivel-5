import { useState, useEffect } from "react";

import styles from "@/styles/Home.module.css";

import Head from "@/components/Head/Head";
import LinhaLivro from "@/components/LinhaLivro/LinhaLivro";
import Livro from "@/classes/modelos/Livro";
import ControleLivros from "@/classes/controles/ControleLivros";

const controleLivros = new ControleLivros();

const LivroLista = () => {
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState<boolean>(false);

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const getLivvros = await controleLivros.obterLivros();
        setLivros(getLivvros);
        setCarregado(true);
      } catch (err) {
        console.error(`Erro: ${err} ao obter livros`);
      }
    };
    fetchLivros();
  });

  const excluir = async (_id: string) => {
    try {
      await controleLivros.excluir(_id).then(() => {
        setCarregado(true);
      });
    } catch (err) {
      console.error(`Erro: ${err} ao excluir o livro`);
    }
  };

  return (
    <>
      <header>
        <Head />
      </header>
      <div>
        <div className="flex-row">
          <h1 className="h1">Livros disponíveis</h1>
        </div>
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
    </>
  );
};

export default LivroLista;
