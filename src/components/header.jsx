
import { Link } from "@mui/material"
import { Button } from "@mui/material"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Button as MuiButton } from "@mui/material"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const primeiroNome = user ? user.nome.split(" ")[0] : ""

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3" style={{ textDecoration:"none" }}>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">MS</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold leading-tight text-foreground">
              Mirante da Sustentabilidade
            </span>
            <span className="text-xs text-muted-foreground">Estado de São Paulo</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/mapa" className="text-sm font-medium text-foreground transition-colors hover:text-primary" style={{ textDecoration:"none" }}>
            Mapa
          </NavLink>
          <NavLink to="/acoes" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            Ações
          </NavLink>
          <NavLink
            to="/indicadores"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Indicadores
          </NavLink>
          <NavLink to="/noticias" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            Notícias
          </NavLink>
          <NavLink to="/sobre" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            Sobre
          </NavLink>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">Olá, {primeiroNome}</span>
              <Button sx={{ backgroundColor: '#D32F2F', color: 'white', textTransform: 'none' }} onClick={logout} >
                Sair
              </Button>
            </div>
          ) : (
            <>
              <Button sx={{ ':hover': { backgroundColor: '#4CAF50', color: 'white', }, textTransform: 'none', fontWeight: 500 }} color="" asChild>
                <NavLink to="/login"> Entrar</NavLink>
              </Button>
              <Button sx={{ backgroundColor: '#D32F2F', color: 'white', textTransform: 'none' }} color="" asChild>
                <NavLink to="/cadastro">Cadastrar</NavLink>
              </Button>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-6">
            <Link href="/mapa" className="text-sm font-medium text-foreground">
              Mapa
            </Link>
            <Link href="/acoes" className="text-sm font-medium text-foreground">
              Ações
            </Link>
            <Link href="/indicadores" className="text-sm font-medium text-foreground">
              Indicadores
            </Link>
            <Link href="/noticias" className="text-sm font-medium text-foreground">
              Notícias
            </Link>
            <Link href="/sobre" className="text-sm font-medium text-foreground">
              Sobre
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              {user ? (
                <>
                  <div className="px-2 py-2">Olá, {primeiroNome}</div>
                  <Button onClick={logout}>Sair</Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/login">Entrar</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/cadastro">Cadastrar</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
