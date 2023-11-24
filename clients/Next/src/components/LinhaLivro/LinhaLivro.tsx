import ControleEditora from "@/classes/controles/ControleEditora";
import ControleLivros from "@/classes/controles/ControleLivros";
import Livro from "@/classes/modelos/Livro";

interface LinhaLivroProps {
  livro: Livro;
  excluir: (_id: string) => void;
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
        </div>
      </td>
      <div>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            if (props.livro._id !== null) {
              props.excluir(props.livro._id);
            }
          }}>
          Excluir
        </button>
      </div>
    </tr>
  );
};

export default LinhaLivro;
