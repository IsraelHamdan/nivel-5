import { Component, OnInit } from '@angular/core';
import { Editora } from 'src/app/editora';
import { Livro } from 'src/app/livro';
import { ControleEditoraService } from 'src/app/controle-editora.service';
import { ControleLivrosService } from 'src/app/controle-livros.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css'],
})
export class LivroListaComponent implements OnInit {
  public editoras: Array<Editora> = [];
  public livros: Array<Livro> = [];

  constructor(
    public servEditora: ControleEditoraService,
    public servLivros: ControleLivrosService
  ) {}

  ngOnInit(): void {
    this.editoras = this.servEditora.getEditoras();
    this.servLivros.obterLivros().then((livros) => {
      this.livros = livros;
    });
  }

  excluir(_id: string | null): void {
    if (_id !== null) {
      this.servLivros.exluir(_id).then(() => {
        this.servLivros.obterLivros().then((livros) => {
          this.livros = livros;
        });
      });
    }
  }

  obterNome(codEditora: number): string {
    const editora = this.editoras.find((e) => e.codEditora === codEditora);
    return editora ? editora.nome : 'Editora não encontrada';
  }
}
