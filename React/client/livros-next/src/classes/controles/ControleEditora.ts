import Editora from "@/classes/modelos/Editora";

const editoras: Array<Editora> = [
  {
    codEditora: 1,
    nome: "Alta Books",
  },
  {
    codEditora: 2,
    nome: "Pearson",
  },
  {
    codEditora: 3,
    nome: "Addisson Wesley",
  },
];

export default class ControleEditora {
  public getEditoras(): Array<Editora> {
    return editoras;
  }

  public getNomeEditora(codEditora: number): string | undefined {
    console.log("Chamada getNomeEditora com código:", codEditora);
    const editoraEncontrada = editoras.find(
      (editora) => editora.codEditora === codEditora
    );
    return editoraEncontrada ? editoraEncontrada.nome : undefined;
  }
}
