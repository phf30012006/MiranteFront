import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/Home"
import CadastroPage from "./pages/Cadastro"
import LoginPage from "./pages/Login"
import AcoesPage from "./pages/Acoes"
import NotFoundPage from "./pages/NotFound"
import { AuthProvider } from "./contexts/AuthContext"
// import MapaPage from "./pages/Mapa"
// import AcoesPage from "./pages/Acoes"
import AcaoDetalhesPage from "./pages/AcaoDetalhes"
import CadastroAcoesPage from "./pages/CadastroAcoes"
// import IndicadoresPage from "./pages/Indicadores"
import NoticiasPage from "./pages/Noticias"
// import AdminPage from "./pages/Admin"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/acoes" element={<AcoesPage />} />
        <Route path="/cadastro-acoes" element={<CadastroAcoesPage />} />
        <Route path="/acoes/:id" element={<AcaoDetalhesPage />} />
        <Route path="/noticias" element={<NoticiasPage />} />
        {/* <Route path="/mapa" element={<MapaPage />} />
        <Route path="/nova-acao" element={<NovaAcaoPage />} />
        <Route path="/indicadores" element={<IndicadoresPage />} />
        <Route path="/admin" element={<AdminPage />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
