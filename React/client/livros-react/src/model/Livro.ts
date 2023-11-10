export default interface Livro {
  codigo: string | null;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: Array<string>;
}
