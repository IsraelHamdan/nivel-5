import Livro from "@/classes/modelos/Livro";
const livros: Array<Livro> = [
  {
    codigo: 1,
    codEditora: 1,
    titulo: "Use a Cabeça: Java",
    resumo:
      "Use a Cabeça! Java é uma experiência completa de aprendizado em programação orientada a objetos (POO) e Java.",
    autores: ["Bert Bates", "Kathy Sierra"],
  },
  {
    codigo: 2,
    codEditora: 2,
    titulo: "Java, Como Programar",
    resumo:
      "Milhões de alunos e profissionais aprendem programação e desenvolvimento de software com os livros Deitel.",
    autores: ["Paul Deitel", "Harvey Deitel"],
  },
  {
    codigo: 3,
    codEditora: 3,
    titulo: "Core Java para os Impacientes",
    resumo:
      "Leitores familiarizados com os livros originais de dois volumes de Horstmann 'Core Java' que procuram um guia abrangente, mas condensado, para todas as novas funcionalidades e funções do Java SE 9 aprenderão como essas novas funcionalidades impactam a linguagem e as bibliotecas centrais.",
    autores: ["Cay Horstmann"],
  },
];

export default class ControleLivros {
  incluir(newBook: Livro): void {
    const codigos = livros.map((livro) => livro.codigo);
    const newCode = Math.max(...codigos) + 1;

    newBook.codigo = newCode;

    livros.push(newBook);
  }

  excluir(codigoLivro: number): void {
    const index = livros.findIndex((livro) => livro.codigo === codigoLivro);

    if (index !== -1) {
      livros.splice(index, 1);
    }
  }

  obterLivros() {
    return livros;
  }
}
