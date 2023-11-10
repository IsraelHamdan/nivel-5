/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ControleEditora from "../../controller/ControleEditora";
import ControleLivros from "../../controller/ControleLivros";

const LivroDados = () => {
  const controleLivros = new ControleLivros();
  const controleEditora = new ControleEditora();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState<string>("");
  const [resumo, setResumo] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [autores, setAutores] = useState<string>("");
  const [codEditora, setCodEditora] = useState<string>("");
  const [opcoes, setOpcoes] = useState<Array<{ value: number; text: string }>>(
    []
  );

  useEffect(() => {
    const getEditoras = async () => {
      const editoras = controleEditora.getEditoras();

      const opcoesMapeadas = editoras.map((editora) => ({
        value: editora.codEditora,
        text: editora.nome,
      }));
      setOpcoes(opcoesMapeadas);
    };
    getEditoras();
  }, [controleEditora]);

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = event.target.value;
    setCodEditora(selectValue);
  };

  const incluir = (event: React.FormEvent) => {
    event.preventDefault();
    const autoresArray = autores.split("\n").map((autor) => autor.trim());

    const newBook = {
      codigo: "",
      titulo: titulo,
      resumo: resumo,
      autores: autoresArray,
      codEditora: Number(codEditora),
    };
    controleLivros.incluir(newBook);
    navigate("/");
  };

  return (
    <section className="container-xxl tab-content">
      <h1 className="h1">Cadastro de Livros</h1>
      <form onSubmit={incluir}>
        <div>
          <label className="form-label" htmlFor="titlo">
            Titulo
          </label>
          <input
            className="form-control"
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="resumo" className="form-label">
            Resumo
          </label>
          <textarea
            id="resumo"
            className="form-control"
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}></textarea>
        </div>
        <div>
          <label htmlFor="editora" className="form-label">
            Editora
          </label>
          <select
            id="editora"
            className="form-control mb-2"
            value={codEditora}
            onChange={tratarCombo}>
            {opcoes.map((opcao) => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.text}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="autores" className="form-label">
            Autores
          </label>
          <input
            id="autores"
            value={autores}
            type="text"
            className="form-control"
            onChange={(e) => setAutores(e.target.value)}
          />
        </div>
        <button className="btn btn-outline-success" type="submit">
          Incluir
        </button>
      </form>
    </section>
  );
};

export default LivroDados;
