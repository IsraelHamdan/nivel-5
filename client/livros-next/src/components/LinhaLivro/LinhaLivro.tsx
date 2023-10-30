import ControleEditora from "@/classes/controles/ControleEditora";
import ControleLivros from "@/classes/controles/ControleLivros";
import Livro from "@/classes/modelos/Livro";

const controleEditora = new ControleEditora();

interface LinhaLivroProps {
  livro: Livro;
  excluir: (codigo: string) => void;
}

const LinhaLivro = (props: LinhaLivroProps) => {
  const controleEditora = new ControleEditora();
  const controleLivros = new ControleLivros();
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
        <div>
          <div> {nomeEditora}</div>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => props.excluir(props.livro.codigo.toString())}>
            Excluir
          </button>
        </div>
      </td>
    </tr>
  );
};

export default LinhaLivro;
