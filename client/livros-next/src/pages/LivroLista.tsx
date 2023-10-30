import { useState, useEffect } from "react";

import styles from "@/styles/Home.module.css";

import Head from "@/components/Head/Head";
import LinhaLivro from "@/components/LinhaLivro/LinhaLivro";

const baseURL: string = "http://localhost:3000/api/livros";

interface Livro {
  codigo: number;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
  editora: string;
}

const obter = async () => {
  const res = await fetch(baseURL);
  return res.json();
};

const excluirLivro = async (codigo: number) => {
  const res = await fetch(`${baseURL}/${codigo}`, {
    method: "DELETE",
  });
  return res.ok;
};

const LivroLista = () => {
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState<boolean>(false);

  useEffect(() => {
    obter().then((data: Array<Livro>) => {
      setLivros(data);
      setCarregado(true);
    });
  }, [carregado]);

  const excluir = async (codigo: number) => {
    const sucesso = await excluirLivro(codigo);
    sucesso ? setCarregado(false) : console.log(sucesso, codigo);
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
              {livros.map((livro: Livro) => (
                <LinhaLivro
                  key={livro.codigo}
                  livro={livro}
                  excluir={() => excluir(livro.codigo)}
                />
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
};

export default LivroLista;
