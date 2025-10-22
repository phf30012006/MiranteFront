import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Avatar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  MenuItem,
  Typography,
} from "@mui/material"
import { NavLink, useNavigate } from "react-router-dom"
import "@fontsource/montserrat/600.css"
import "@fontsource/open-sans/400.css"
import { api } from "../../services/api"
import { useState, useEffect } from "react"
import { CircularProgress } from "@mui/material"

export default function CadastroPage() {
  const navigate = useNavigate()
  const [openSnackbar, setOpenSnasckbar] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [snackbarKey, setSnackbarKey] = useState(0)
  const [municipios, setMunicipios] = useState([])
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    tipo_perfil: "",
    municipio_id: "",
    senha: "",
    confirmarSenha: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return
    setOpenSnasckbar(false)
    setError("")
  };

  const showError = (msg) => {
    setSnackbarKey(Date.now())
    setError(msg)
    setOpenSnasckbar(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formData.nome || !formData.email || !formData.tipo_perfil || !formData.municipio_id || !formData.senha) {
      showError("Por favor, preencha todos os campos")
      return
    }

    if (formData.senha !== formData.confirmarSenha) {
      showError("As senhas não coincidem")
      return
    }

    try {
      setLoading(true)
      const response = await api.post("/auth/register", {
        nome: formData.nome,
        email: formData.email,
        tipo_perfil: formData.tipo_perfil,
        municipio_id: Number(formData.municipio_id),
        senha: formData.senha
      })

      if (response.status === 200) {
        navigate("/login")
      }
    } catch (err) {
      showError(err.response?.data?.message || "Erro ao criar conta. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const buscarMunicipios = async () => {
    try {
      const response = await api.get("/municipios/")
      setMunicipios(response.data)
    } catch (error) {
      console.error("Erro ao buscar municípios:", error)
    }
  }

  useEffect(() => {
    buscarMunicipios()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 items-center justify-center bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto">
            <Card sx={{ maxWidth: 460, mx: 'auto', borderRadius: 2, boxShadow: 6, bgcolor: 'background.paper', fontFamily: 'Montserrat, "Open Sans", Inter, sans-serif' }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, py: 2 }}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <span className="text-xl font-bold text-primary-foreground">M</span>
                  </div>
                  <Typography variant="h5" component="h1" sx={{ mt: 1, fontWeight: 700, fontFamily: 'Montserrat, "Open Sans", Inter, sans-serif' }}>Criar Conta</Typography>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1, font: '"Open Sans"' }}>Cadastre-se para acessar a plataforma Mirante da Sustentabilidade</Typography>
                </Box>

                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  sx={{ display: "grid", gap: 2, mt: 2 }}
                >
                  <Snackbar
                    key={snackbarKey}
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <Alert severity="error" onClose={handleCloseSnackbar} sx={{ width: "100%" }}>
                      {error}
                    </Alert>
                  </Snackbar>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 200, marginBottom: -1 }}
                    className="text-label"
                  >
                    Nome Completo
                  </Typography>
                  <TextField
                    id="name"
                    name="nome"
                    placeholder="Seu nome completo"
                    fullWidth
                    required
                    size="small"
                    value={formData.nome}
                    onChange={handleChange}
                    InputProps={{
                      sx: {
                        borderRadius: 1.25,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#d1d5db", 
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#B70002",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#B70002", 
                        },
                      },
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 200, marginBottom: -1 }}
                    className="text-label"
                  >
                    E-mail
                  </Typography>
                  <TextField
                    id="email"
                    name="email"
                    placeholder="seu@email.com"
                    variant="outlined"
                    fullWidth
                    required
                    type="email"
                    size="small"
                    value={formData.email}
                    onChange={handleChange}
                    InputProps={{
                      sx: {
                        borderRadius: 1.25,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#d1d5db",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#B70002",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#B70002",
                        },
                      },
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 200, marginBottom: -1 }}
                    className="text-label"
                  >
                    Tipo de Perfil
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      id="tipo_perfil"
                      name="tipo_perfil"
                      displayEmpty
                      value={formData.tipo_perfil}
                      onChange={handleChange}
                      renderValue={(selected) =>
                        selected ? selected : "Selecione seu perfil"
                      }
                      sx={{
                        borderRadius: 1.25,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#d1d5db",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#B70002",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#B70002",
                        },
                      }}
                    >
                      <MenuItem value="admin">Administrador</MenuItem>
                      <MenuItem value="gestor público">Gestor Público</MenuItem>
                      <MenuItem value="pesquisador">Pesquisador</MenuItem>
                      <MenuItem value="cidadão">Cidadão</MenuItem>
                    </Select>
                  </FormControl>

                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 200, marginBottom: -1 }}
                    className="text-label"
                  >
                    Município
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      id="municipio_id"
                      name="municipio_id"
                      displayEmpty
                      value={formData.municipio_id}
                      onChange={handleChange}
                      renderValue={(selected) => {
                        if (!selected) return "Selecione seu município";
                        const municipioSelecionado = municipios.find(m => m.id === selected);
                        return municipioSelecionado ? municipioSelecionado.nome : "";
                      }}
                      sx={{
                        borderRadius: 1.25,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#d1d5db",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#B70002",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#B70002",
                        },
                      }}
                    >
                      <MenuItem value="">Selecione</MenuItem>
                      {municipios.map(municipio => (
                        <MenuItem key={municipio.id} value={municipio.id}>
                          {municipio.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 200, marginBottom: -1 }}
                    className="text-label"
                  >
                    Senha
                  </Typography>
                  <TextField
                    id="password"
                    name="senha"
                    placeholder="••••••••"
                    variant="outlined"
                    fullWidth
                    required
                    type="password"
                    size="small"
                    value={formData.senha}
                    onChange={handleChange}
                    InputProps={{
                      sx: {
                        borderRadius: 1.25,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#d1d5db",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#B70002",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#B70002",
                        },
                      },
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 200, marginBottom: -1 }}
                    className="text-label"
                  >
                    Confirmar Senha
                  </Typography>
                  <TextField
                    id="confirm-password"
                    name="confirmarSenha"
                    placeholder="••••••••"
                    variant="outlined"
                    fullWidth
                    required
                    type="password"
                    size="small"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    InputProps={{
                      sx: {
                        borderRadius: 1.25,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#d1d5db",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#B70002",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#B70002",
                        },
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 1.5,
                      borderRadius: 2,
                      backgroundColor: "#B70002",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#990002",
                      },
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Criar Conta"}
                  </Button>
                </Box>

                <Box mt={2} textAlign="center">
                  <Typography variant="body2" color="text.secondary" component="span">Já tem uma conta? </Typography>
                  <NavLink to="/login" className="text-sm font-medium text-primary transition-colors hover:text-primary" style={{ textDecoration:"none" }}>
                    Faça login
                  </NavLink>
                </Box>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
