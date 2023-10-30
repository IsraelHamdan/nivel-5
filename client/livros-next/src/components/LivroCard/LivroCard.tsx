import Link from "next/link";
import { useState, useEffect } from "react";

const baseURL: string = "http://localhost:3000/api/livros";

interface Livro {
  codigo: number;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
  editora: string;
}

const LivroItem = ({ livro }: { livro: Livro }) => (
  <div
    className="card col-md-2 mb-4 mr-2 d-flex justify-content-center row-md-6 mb-5"
    key={livro.codigo}>
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

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await fetch(baseURL);
        if (res.ok) {
          const data = await res.json();
          setLivros(data.slice(0, 3));
        } else {
          console.error("Deu erro");
        }
      } catch (error) {
        console.error("🚀 ~ file: LivroCard.tsx:33 ~ getBooks ~ error:", error);
      }
    };
    getBooks();
  }, []);

  return (
    <>
      <div className="container d-flex justify-content-center row-md-4 mb-5 ">
        <div className="row d-flex justify-content-center mr-3 ">
          {livros.map((livro) => (
            <LivroItem key={livro.codigo} livro={livro} />
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
