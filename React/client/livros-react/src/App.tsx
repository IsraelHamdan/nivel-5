import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LivrosDados from "./components/LivroDados/LivrosDados";
import LivrosLista from "./components/LivrosLista/LivrosLista";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Catalogo
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/dados">
              Novo
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<LivrosLista />} />
        <Route path="dados" element={<LivrosDados />} />
      </Routes>
    </BrowserRouter>
  );
}
