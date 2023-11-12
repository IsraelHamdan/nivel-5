import Livro from "../model/Livro";

const baseUrl = "http://localhost:3030/livros";

interface LivroMongo {
  // codigo = _id, tem que ficar assim se não da erro, não sei quanto ao nulo
  codigo: string | null;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

export default class ControleLivro {
  private livroMongoParaLivro(livroMongo: LivroMongo): Livro {
    return {
      codigo: livroMongo.codigo,
      codEditora: livroMongo.codEditora,
      titulo: livroMongo.titulo,
      resumo: livroMongo.resumo,
      autores: livroMongo.autores,
    };
  }

  private livroParaLivroMongo(livro: Livro): LivroMongo {
    return {
      codigo: livro.codigo,
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores,
    };
  }

  async obterLivros(): Promise<Livro[]> {
    try {
      const reqOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(baseUrl, reqOptions);
      const data = await res.json();
      const livrosMongo: LivroMongo[] = data.data;
      if (!Array.isArray(livrosMongo)) {
        throw new Error(
          "Erro ao obter os livros pois não vieram no formato esperado"
        );
      }
      return livrosMongo.map((livroMongo) =>
        this.livroMongoParaLivro(livroMongo)
      );
    } catch (error) {
      throw new Error(`Erro ${error} ao obter os livros`);
    }
  }
  async incluir(livro: Livro): Promise<boolean> {
    try {
      const livroMongo: LivroMongo = this.livroParaLivroMongo(livro);
      const reqOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(livroMongo),
      };
      const res = await fetch(baseUrl, reqOptions);
      return res.ok;
    } catch (error) {
      throw new Error(`Erro ${error} ao incluir o livro`);
    }
  }
  async excluir(codigo: string): Promise<boolean> {
    try {
      const reqOptions = {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      };
      const res = await fetch(`${baseUrl}/${codigo}`, reqOptions);
      return res.ok;
    } catch (error) {
      throw new Error(`Erro ${error} ao excluir o livro`);
    }
  }
}
