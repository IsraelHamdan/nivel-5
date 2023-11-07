import Livro from "../modelo/Livro";

const baseUrl = "http://localhpst:3030/livros";

interface LivroMongo {
  codigo: string;
  codEditora: string;
  titulo: string;
  resumo: string;
  autores: string[];
}

export default class ControleLivro {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async obterLivros(): Promise<Livro[]> {
    try {
      const res = await fetch(baseUrl);
      const data = await res.json();
      const livrosMongo: LivroMongo[] = data.data;
      if (!Array.isArray(livrosMongo)) {
        throw new Error("Dados fora do formato esperado!");
      }
      return livrosMongo.map((livro) =>
        this.converterLivroParaLivroMongo(livro)
      );
    } catch (error) {
      console.error(`Não foi possivel incluir o livro pois: ${error}`);
    }
    return [];
  }

  async incluir(livro: Livro): Promise<boolean> {
    try {
      const livroMongo: LivroMongo = this.converterLivroMongoParaLivro(livro);
      const res = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(livroMongo),
      });
      return res.ok;
    } catch (error) {
      console.error(`Erro ao incluir o livro: ${error}`);
    }
    return false;
  }

  async excluir(codigo: string): Promise<boolean> {
    try {
      const res = await fetch(`${baseUrl}/${codigo}`, {
        method: "DELEETE",
      });
      return res.ok;
    } catch (error) {
      console.error(`Não foi possivel excluir o livro pois: ${error}`);
    }
    return false;
  }

  private converterLivroParaLivroMongo(livro: Livro): LivroMongo {
    return {
      codigo: livro.codigo,
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores,
    };
  }
  private converterLivroMongoParaLivro(livroMongo: LivroMongo): Livro {
    return {
      codigo: livroMongo.codigo,
      codEditora: livroMongo.codEditora,
      titulo: livroMongo.titulo,
      resumo: livroMongo.resumo,
      autores: livroMongo.autores,
    };
  }
}
