import Link from "next/link";
import { useState, useEffect } from "react";

import Livro from "@/classes/modelos/Livro";
import ControleLivros from "@/classes/controles/ControleLivros";

const controleLivros = new ControleLivros();

const LivroItem = ({ livro }: { livro: Livro }) => (
  <div
    className="card col-md-2 mb-4 mr-2 d-flex justify-content-center row-md-6 mb-5"
    key={livro._id}>
    <div className="card-body">
      <h6 className="card-title">{livro.titulo}</h6>
      <p className="card-text">{livro.resumo}</p>
      <p className="card-text">
        <strong>Autores:</strong> {livro.autores.join(", ")}
      </p>
    </div>
  </div>
);

const LivroCard = () => {
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

  return (
    <>
      <div className="container d-flex justify-content-center row-md-4 mb-5 ">
        <div className="row d-flex justify-content-center mr-3 ">
          {livros.map((livro) => (
            <LivroItem key={livro._id} livro={livro} />
          ))}
        </div>
      </div>
      <button className="btn btn-outline-primary mt-3">
        <Link href="/LinhaLivro">Lista de livros</Link>
      </button>
    </>
  );
};

export default LivroCard;
