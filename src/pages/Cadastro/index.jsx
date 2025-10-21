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

export default function CadastroPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 items-center justify-center bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto">
            <Card sx={{ maxWidth: 420, mx: 'auto', borderRadius: 2, boxShadow: 6, bgcolor: 'background.paper' }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, py: 2 }}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <span className="text-xl font-bold text-primary-foreground">M</span>
                  </div>
                  <Typography variant="h5" component="h1" sx={{ mt: 1, fontWeight: 700 }}>Criar Conta</Typography>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>Cadastre-se para acessar a plataforma Mirante da Sustentabilidade</Typography>
                </Box>

                <Box component="form" noValidate autoComplete="off" sx={{ display: 'grid', gap: 2, mt: 2 }}>
                  <TextField id="name" label="Nome Completo" variant="outlined" fullWidth required size="small" />
                  <TextField id="email" label="E-mail" variant="outlined" fullWidth required type="email" size="small" />

                  <FormControl fullWidth size="small">
                    <InputLabel id="profile-type-label">Tipo de Perfil</InputLabel>
                    <Select labelId="profile-type-label" id="profile-type" label="Tipo de Perfil" defaultValue="">
                      <MenuItem value="">Selecione</MenuItem>
                      <MenuItem value="secretaria">Secretaria Municipal</MenuItem>
                      <MenuItem value="pesquisador">Pesquisador</MenuItem>
                      <MenuItem value="cidadao">Cidadão</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth size="small">
                    <InputLabel id="municipality-label">Município</InputLabel>
                    <Select labelId="municipality-label" id="municipality" label="Município" defaultValue="">
                      <MenuItem value="">Selecione</MenuItem>
                      <MenuItem value="sp">São Paulo</MenuItem>
                      <MenuItem value="campinas">Campinas</MenuItem>
                      <MenuItem value="santos">Santos</MenuItem>
                      <MenuItem value="ribeirao">Ribeirão Preto</MenuItem>
                      <MenuItem value="sorocaba">Sorocaba</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField id="password" label="Senha" variant="outlined" fullWidth required type="password" size="small" />
                  <TextField id="confirm-password" label="Confirmar Senha" variant="outlined" fullWidth required type="password" size="small" />

                  <Button type="submit" sx={{ backgroundColor: '#D32F2F', color: 'white', textTransform: 'none' }} color="" asChild>
                    Criar Conta
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
