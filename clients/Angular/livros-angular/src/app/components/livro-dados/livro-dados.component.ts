import { Component, OnInit } from '@angular/core';
import { ControleLivrosService } from 'src/app/controle-livros.service';
import { ControleEditoraService } from 'src/app/controle-editora.service';
import { Livro } from 'src/app/livro';
import { Editora } from 'src/app/editora';
import { Router } from '@angular/router';
@Component({
  selector: 'app-livro-dados',
  templateUrl: './livro-dados.component.html',
  styleUrls: ['./livro-dados.component.css'],
})
export class LivroDadosComponent implements OnInit {
  livro: Livro = {
    _id: null,
    codEditora: 0,
    titulo: '',
    resumo: '',
    autores: [],
  };
  autoresForm: string = '';
  editoras: Array<Editora> = [];

  constructor(
    private servEditora: ControleEditoraService,
    private servLivros: ControleLivrosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editoras = this.servEditora.getEditoras();
  }

  incluir = () => {
    this.livro.autores = this.autoresForm.split('\n');

    this.servLivros
      .incluir(this.livro)
      .then((resultado) => {
        if (resultado) {
          this.router.navigateByUrl('/lista');
        } else {
          // Lidar com o caso em que a inclusão falhou, se necessário
          console.error('Falha ao incluir o livro.');
        }
      })
      .catch((error) => {
        console.error(`Erro ao incluir o livro: ${error}`);
      });
  };
}
