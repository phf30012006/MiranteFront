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
  MenuItem,
  Typography,
  Snackbar,
  CircularProgress,
} from "@mui/material"
import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import { api } from "../../services/api"
import { useAuth } from "../../contexts/AuthContext"
import "@fontsource/montserrat/600.css"
import "@fontsource/open-sans/400.css"

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: "", senha: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [open, setOpen] = useState(false)
  const [snackbarKey, setSnackbarKey] = useState(0)

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return
    setOpen(false)
    setError("")
  }

  const showError = (msg) => {
    setSnackbarKey(Date.now())
    setError(msg)
    setOpen(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.senha) {
      showError("Preencha e-mail e senha")
      return
    }

    try {
      setLoading(true)
      const params = new URLSearchParams()
      params.append("username", form.email)
      params.append("password", form.senha)

      const resp = await api.post("/auth/login", params.toString(), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })

      const token = resp.data?.access_token || resp.data?.token
      if (token) {
        await login(token)
        navigate("/")
      } else {
        showError("Resposta inesperada do servidor")
      }
    } catch (err) {
      const detail = err.response?.data?.detail || err.response?.data?.message
      if (Array.isArray(detail)) {
        const msgs = detail.map(d => {
          const loc = Array.isArray(d.loc) ? d.loc.join('.') : (d.loc || '')
          const msg = d.msg || d.message || JSON.stringify(d)
          return loc ? `${loc}: ${msg}` : msg
        }).join('; ')
        showError(msgs || "Credenciais inválidas")
      } else {
        showError(detail || "Credenciais inválidas")
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 items-center justify-center bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto">
            <Card sx={{ maxWidth: 450, mx: 'auto', borderRadius: 2, boxShadow: 6, bgcolor: 'background.paper', fontFamily: 'Montserrat, "Open Sans", Inter, sans-serif' }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, py: 2 }}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <span className="text-xl font-bold text-primary-foreground">M</span>
                  </div>
                  <Typography variant="h5" component="h1" sx={{ mt: 1, fontWeight: 700, fontFamily: 'Montserrat, "Open Sans", Inter, sans-serif' }}>Bem-vindo de volta</Typography>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1, font: '"Open Sans"' }}>Entre com suas credenciais para acessar a plataforma</Typography>
                </Box>

                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  sx={{ display: "grid", gap: 2, mt: 2 }}
                >
                  <Snackbar key={snackbarKey} open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                    <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>{error}</Alert>
                  </Snackbar>
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
                    value={form.email}
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
                    value={form.senha}
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
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
                  </Button>
                </Box>

                <Box mt={2} textAlign="center">
                  <Typography variant="body2" color="text.secondary" component="span">Não tem uma conta? </Typography>
                  <NavLink to="/cadastro" className="text-sm font-medium text-primary transition-colors hover:text-primary" style={{ textDecoration:"none" }}>
                    Cadastre-se
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
