import Livro from "../modelo/Livro";

const baseUrl = "http://localhost:3030/livros";

interface LivroMongo {
  _id: number | null;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

export default class ControleLivros {
  async obterLivros(): Promise<Livro[]> {
    try {
      const res = await fetch(baseUrl, { method: "GET" });
      if (res.ok) {
        const livrosMongo: LivroMongo[] = await res.json();

        const livros: Livro[] = livrosMongo.map((livroMongo: LivroMongo) => ({
          codigo: String(livroMongo._id),
          codEditora: Number(livroMongo.codEditora),
          titulo: livroMongo.titulo,
          resumo: livroMongo.resumo,
          autores: livroMongo.autores,
        }));

        return livros;
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  }

  async excluir(codigo: number): Promise<boolean> {
    try {
      const res = await fetch(`${baseUrl}/${codigo}`, { method: "DELETE" });
      if (res.ok) {
        const result = await res.json();
        return result.ok === 1;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  async incluir(livro: Livro): Promise<boolean> {
    const livroMongo: LivroMongo = {
      _id: Number(livro.codigo),
      codEditora: Number(livro.codEditora),
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores,
    };

    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livroMongo),
    };
    const res = await fetch(baseUrl + "/cadastro", reqOptions);
    if (res.ok) {
      const result = await res.json();
      return result.ok === 1;
    }
    return false;
  }
}
