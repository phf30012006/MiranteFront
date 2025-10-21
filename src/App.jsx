import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/Home"
import CadastroPage from "./pages/Cadastro"
import LoginPage from "./pages/Login"
// import MapaPage from "./pages/Mapa"
// import AcoesPage from "./pages/Acoes"
// import AcaoDetalhesPage from "./pages/AcaoDetalhes"
// import NovaAcaoPage from "./pages/NovaAcao"
// import IndicadoresPage from "./pages/Indicadores"
// import NoticiasPage from "./pages/Noticias"
// import AdminPage from "./pages/Admin"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cadastro" element={<CadastroPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/mapa" element={<MapaPage />} />
      <Route path="/acoes" element={<AcoesPage />} />
      <Route path="/acoes/:id" element={<AcaoDetalhesPage />} />
      <Route path="/nova-acao" element={<NovaAcaoPage />} />
      <Route path="/indicadores" element={<IndicadoresPage />} />
      <Route path="/noticias" element={<NoticiasPage />} />
      <Route path="/admin" element={<AdminPage />} /> */}
    </Routes>
  )
}

export default App
