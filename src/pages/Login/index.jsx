import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import {
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
} from "@mui/material"
import { NavLink } from "react-router-dom"
import "@fontsource/montserrat/600.css"
import "@fontsource/open-sans/400.css"

export default function LoginPage() {
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
                  autoComplete="off"
                  sx={{ display: "grid", gap: 2, mt: 2 }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 200, marginBottom: -1 }}
                    className="text-label"
                  >
                    E-mail
                  </Typography>
                  <TextField
                    id="email"
                    placeholder="seu@email.com"
                    variant="outlined"
                    fullWidth
                    required
                    type="email"
                    size="small"
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
                    placeholder="••••••••"
                    variant="outlined"
                    fullWidth
                    required
                    type="password"
                    size="small"
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
                    Entrar
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
