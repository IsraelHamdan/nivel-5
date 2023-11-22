import { Injectable } from '@angular/core';
import { Livro } from './livro';
import { Observable, of } from 'rxjs';

const baseUrl = 'http://localhost:3030';

interface LivroMongo {
  _id: string | null;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ControleLivrosService {
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
      const reqOptions = {
        method: 'GET',
      };
      const reqLivros = await fetch(baseUrl, reqOptions);
      const resLivros = await reqLivros.json();
      console.log(
        '🚀 ~ file: controle-livros.service.ts:47 ~ ControleLivrosService ~ obterLivros ~ resLivros:',
        resLivros
      );
      const livrosDados: LivroMongo[] = resLivros.livros.data;
      console.log(
        '🚀 ~ file: controle-livros.service.ts:52 ~ ControleLivrosService ~ obterLivros ~ livrosDados:',
        livrosDados
      );
      if (!Array.isArray(livrosDados)) {
        console.error('Os livros não vieram no formato de JSON');
      }
      const livros = livrosDados.map((livroMongo: LivroMongo) => {
        return this.livroMongoParaLivro(livroMongo);
      });
      return livros;
    } catch (err) {
      console.error(`Erro: ${err} do controlador ao obter os livros`);
      throw err;
    }
  }
  async incluir(livro: Livro): Promise<boolean> {
    try {
      const livroDb: LivroMongo = this.livroParaLivroMongo(livro);
      const reqOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(livroDb),
      };
      const postLivros = await fetch(baseUrl, reqOptions);
      console.log(
        '🚀 ~ file: controle-livros.service.ts:79 ~ ControleLivrosService ~ incluir ~ postLivros antes da verificação:',
        postLivros
      );
      if (postLivros.ok) {
        console.log(
          '🚀 ~ file: controle-livros.service.ts:79 ~ ControleLivrosService ~ incluir ~ postLivros depois da verificação:',
          postLivros
        );
        return true;
      }
    } catch (err) {
      console.error(`Erro: ${err} do controlador em incluir o ${livro}`);
    }
    return false;
  }
  async exluir(_id: string): Promise<boolean> {
    try {
      const reqOptions = {
        method: 'DELETE',
      };
      const deleteLivro = await fetch(`${baseUrl}/${_id}`);
      if (deleteLivro.ok) {
        return deleteLivro.ok;
      }
    } catch (err) {
      console.error(
        `Erro: ${err} na tentativa do controlador de excluir o livro`
      );
    }
    return false;
  }
}
