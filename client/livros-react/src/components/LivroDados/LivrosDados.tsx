import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ControleEditora from "../../controle/ControleEditora";
import ControleLivros from "../../controle/ControleLivros";

const LivrosDados = () => {
  const controleLivros = new ControleLivros();
  const controleEditora = new ControleEditora();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState<string>("");
  const [resumo, setResumo] = useState<string>("");
  const [autores, setAutores] = useState<string>("");
  const [codEditora, setCodEditora] = useState<number>(0);

  const [opcoes, setOpcoes] = useState<Array<{ value: number; text: string }>>(
    []
  );

  useEffect(() => {
    const editoras = controleEditora.getEditoras();
    const opcoesMapeadas = editoras.map((editora) => ({
      value: editora.codEditora,
      text: editora.nome,
    }));
    setOpcoes(opcoesMapeadas);
  }, [controleEditora]);

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = Number(event.target.value);
    setCodEditora(selectValue);
  };

  const incluir = (event: React.FormEvent) => {
    event.preventDefault();

    const autoresArray = autores.split("\n").map((autor) => autor.trim());

    const newBook = {
      codigo: 0,
      titulo: titulo,
      resumo: resumo,
      autores: autoresArray,
      codEditora: codEditora,
    };
    controleLivros.incluir(newBook);
    navigate("/");
  };

  return (
    <main className="container tab-content">
      <h1>Dados do livro</h1>
      <form onSubmit={incluir}>
        <div>
          <label className="form-label" htmlFor="titulo">
            Titulo:
          </label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="resumo">
            Resumo
          </label>
          <textarea
            id="resumo"
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}>
            Resumo
          </textarea>
        </div>
        <div>
          <label className="form-label" htmlFor="editora">
            Editora
          </label>
          <select
            id="editora"
            value={codEditora}
            onChange={tratarCombo}
            className="form-control mb-2">
            {opcoes.map((opcao) => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.value}
              </option>
            ))}
          </select>
        </div>
      </form>
    </main>
  );
};

export default LivrosDados;
