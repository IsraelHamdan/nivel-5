import type { NextPage } from "next";
import { useRouter } from "next/router";

import ControleEditora from "@/classes/controles/ControleEditora";
import Livro from "@/classes/modelos/Livro";

import Head from "@/components/Head/Head";

import React, { useEffect, useState } from "react";
import ControleLivros from "@/classes/controles/ControleLivros";
import livros from "./api/livros";

const controleEditora = new ControleEditora();
const controleLivros = new ControleLivros();

const LivroDados: NextPage = () => {
  const [opcoes, setOpcoes] = useState<{ value: number; text: string }[]>([]);
  const [titulo, setTitulo] = useState<string>("");
  const [resumo, setResumo] = useState<string>("");
  const [autores, setAutores] = useState<string>("");
  const [codEditora, setCodEditora] = useState(
    opcoes.length > 0 ? opcoes[0].value : 0
  );

  const navigate = useRouter();

  useEffect(() => {
    const editoras = controleEditora.getEditoras();
    const opcoesMapeadas = editoras.map((editora) => ({
      value: editora.codEditora,
      text: editora.nome,
    }));
    setOpcoes(opcoesMapeadas);
  }, []);

  const tratarCombo = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const codEditora = Number(event.target.value);
    setCodEditora(codEditora);
  };

  const incluir = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    try {
      const livro: Livro = {
        codEditora,
        titulo,
        resumo,
        autores: autores.split("\n"),
        _id: null,
      };
      controleLivros.incluir(livro).then((ok) => {
        console.log(livro);
        if (ok) {
          navigate.push("/");
        }
      });
    } catch (err) {
      console.error(
        `Erro: ${err} na tentativa do front-end de incluir o livro`
      );
    }
  };

  return (
    <>
      <Head />
      <main className="container flex-column  mb-6">
        <h1 className="h1 mt-3 display-1">Cadastre o Livro</h1>
        <form className="form d-flex flex-column" onSubmit={incluir}>
          <div className="container-fluid col justify">
            <div className="mb-3 d-flex justify-content-baseline input-group">
              <label className="input-group-text">Titulo</label>
              <input
                className=" form-control text-body-secondary mx-3"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
            <div className="mb-3 d-flex justify-content-baseline input-group">
              <label className="input-group-text">Resumo</label>
              <textarea
                className="form-control text-body-secondary mx-3"
                value={resumo}
                onChange={(e) => setResumo(e.target.value)}
              />
            </div>
            <div className="mb-3 d-flex justify-content-baseline input-group">
              <label className="input-group-text">Autores</label>
              <input
                className=" form-control text-body-secondary mx-3"
                value={autores}
                onChange={(e) => setAutores(e.target.value)}
              />
            </div>
          </div>
          <select
            className="form-select form-select-lg mb-3 d-flex justify-content-baseline"
            onChange={tratarCombo}>
            {opcoes.map((opcao) => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.text}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-info">
            Cadastrar
          </button>
        </form>
      </main>
    </>
  );
};

export default LivroDados;
