export default interface Livro {
  _id: string | null;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: Array<string>;
}
