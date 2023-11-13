import ControleEditora from "../../controller/ControleEditora";

import "./index.css";

interface Livro {
  codigo: string | null;
  titulo: string;
  resumo: string;
  autores: string[];
  codEditora: number;
}

interface LinhaLivroProps {
  livro: Livro;
  excluir: (codigo: string) => void;
}

const LinhaLivro = (props: LinhaLivroProps) => {
  const controleEditora = new ControleEditora();
  const nomeEditora = controleEditora.getNomeEditora(props.livro.codEditora);

  return (
    <tr className="flex">
      <td>
        <p>{props.livro.titulo}</p>
      </td>
      <td>
        <p>{props.livro.resumo}</p>
      </td>
      <td>
        <ul>
          {props.livro.autores.map((autor: string, index: number) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
      <td className="flex-row">
        {nomeEditora}
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            if (props.livro.codigo !== null) {
              props.excluir(props.livro.codigo);
            }
          }}>
          Excluir
        </button>
      </td>
    </tr>
  );
};
export default LinhaLivro;
