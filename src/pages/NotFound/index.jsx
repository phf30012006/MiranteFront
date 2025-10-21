import { NavLink } from "react-router-dom"
import { Box, Button, Typography } from "@mui/material"
import { AlertCircle } from "lucide-react"

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="container mx-auto px-4">
        <Box className="mx-auto max-w-xl rounded-lg bg-card p-8 text-center shadow-md">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
              <AlertCircle className="h-6 w-6" />
            </div>
          </div>
          <Typography variant="h4" component="h1" className="mb-2 font-heading">
            Página não encontrada
          </Typography>
          <Typography variant="body1" className="mb-6 text-muted-foreground">
            A página que você está tentando acessar não existe.
          </Typography>
          <NavLink to="/" className="inline-flex items-center justify-center mt-4 px-8 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium">
            Voltar para a página inicial
          </NavLink>
        </Box>
      </div>
    </div>
  )
}
