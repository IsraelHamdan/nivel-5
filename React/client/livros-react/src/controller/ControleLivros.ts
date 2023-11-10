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
  private livroMongoParaLivro(livroMongo: LivroMongo): Livro {
    return {
      codigo: livroMongo._id,
      codEditora: livroMongo.codEditora,
      titulo: livroMongo.titulo,
      resumo: livroMongo.resumo,
      autores: livroMongo.autores,
    };
  }

  private livroParaLivroMongo(livro: Livro): LivroMongo {
    return {
      _id: livro.codigo,
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores,
    };
  }

  async obterLivros(): Promise<LivroMongo[]> {
    const reqOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await fetch(baseUrl, reqOptions);
      if (!res.ok) {
        throw new Error("Erro ao obter livros");
      }
      const livrosJson = await res.json();
      const livros: LivroMongo[] = livrosJson.map((livroMongo: LivroMongo) => {
        return this.livroParaLivroMongo(livroMongo);
      });
      return livros;
    } catch (error) {
      console.error(`Erro ${error} na tentativa de obter o livro`);
      throw error;
    }
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

  async incluir(livro: Livro): Promise<{ ok: boolean }> {
    const livroMongo: LivroMongo = {
      _id: livro.codigo,
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
    try {
      const res = await fetch(`${baseUrl}/cadastro`, reqOptions);
      if (res.ok) {
        const result = await res.json();
        return { ok: result.ok === 1 };
      }
      return { ok: false };
    } catch (error) {
      console.error(`Não foi possivel incluir o livro: ${error}`);
    }
    return { ok: false };
  }
}
