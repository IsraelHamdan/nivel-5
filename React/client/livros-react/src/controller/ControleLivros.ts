import Livro from "../model/Livro";

const baseUrl = "http://localhost:3030/livros";

interface LivroMongo {
  _id: string | null;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

export default class ControleLivros {
  private livroParaLivroMongo(livro: Livro): LivroMongo {
    return {
      _id: livro._id,
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores,
    };
  }
  private livroMongoParaLivro(livroMongo: LivroMongo): Livro {
    return {
      _id: livroMongo._id,
      codEditora: livroMongo.codEditora,
      titulo: livroMongo.titulo,
      resumo: livroMongo.resumo,
      autores: livroMongo.autores,
    };
  }
  async obterLivros(): Promise<Livro[]> {
    try {
      const reqOptions = { method: "GET" };
      const reqLivros = await fetch(baseUrl, reqOptions);
      const resLivos = await reqLivros.json();
      console.log("Resposta completa da API:", resLivos);

      const livrosData: LivroMongo[] = resLivos.livros.data;
      console.log(
        "🚀 ~ file: ControleLivros.ts:43 ~ ControleLivros ~ obterLivros ~ livrosData:",
        livrosData
      );

      if (!Array.isArray(livrosData)) {
        console.error("Os livros não vieram no formato esperado");
        throw new Error("Os livros não vieram no formato esperado");
      }
      const livros = livrosData.map((livro: Livro) => {
        return this.livroMongoParaLivro(livro);
      });
      console.log(
        "🚀 ~ file: ControleLivros.ts:47 ~ ControleLivros ~ livros ~ livros:",
        livros
      );
      return livros;
    } catch (err) {
      console.error(`Erro ${err} na tentativa de obter os livros`);
      throw err;
    }
  }

  async incluir(livro: Livro): Promise<boolean> {
    try {
      const livroDb: LivroMongo = this.livroParaLivroMongo(livro);
      const reqOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(livroDb),
      };
      const postLivros = await fetch(baseUrl, reqOptions);
      if (postLivros.ok) {
        console.log(
          "🚀 ~ file: ControleLivros.ts:69 ~ ControleLivros ~ incluir ~ postLivros:",
          postLivros
        );

        return true;
      }
    } catch (err) {
      console.error(`Erro: ${err}, na tentativa de incluir o livro`);
    }
    return false;
  }

  async excluir(_id: string): Promise<boolean> {
    try {
      const reqOptions = { method: "DELETE" };
      const deleteReq = await fetch(`${baseUrl}/${_id}`, reqOptions);

      console.log(
        "🚀 ~ file: ControleLivros.ts:88 ~ ControleLivros ~ excluir ~ deleteReq:",
        deleteReq
      );
      return deleteReq.ok;
    } catch (err) {
      console.error(`Erro: ${err} na tentativa de excluir o livro`);
      return false;
    }
  }
}
