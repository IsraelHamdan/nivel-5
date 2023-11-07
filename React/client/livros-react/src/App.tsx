import { BrowserRouter, Routes, Route } from "react-router-dom";
import LivrosDados from "./components/LivroDados/LivrosDados";
import LivrosLista from "./components/LivrosLista/LivrosLista";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<LivrosLista />} />
        <Route path="dados" element={<LivrosDados />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
