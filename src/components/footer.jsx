import { Link } from "@mui/material"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { NavLink } from "react-router-dom"

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">MS</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-base font-bold leading-tight">Mirante da Sustentabilidade</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed text-white/80">
              Acompanhe as iniciativas de sustentabilidade nos municípios paulistas.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-bold text-white">Navegação</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <NavLink to="/mapa" className="text-white/80 transition-colors hover:text-white">
                  Mapa Interativo
                </NavLink>
              </li>
              <li>
                <NavLink to="/acoes" className="text-white/80 transition-colors hover:text-white">
                  Ações
                </NavLink>
              </li>
              <li>
                <NavLink to="/indicadores" className="text-white/80 transition-colors hover:text-white">
                  Indicadores
                </NavLink>
              </li>
              <li>
                <NavLink to="/noticias" className="text-white/80 transition-colors hover:text-white">
                  Notícias
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-bold text-white">Institucional</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <NavLink to="/sobre" className="text-white/80 transition-colors hover:text-white">
                  Sobre o Projeto
                </NavLink>
              </li>
              <li>
                <NavLink to="/ods" className="text-white/80 transition-colors hover:text-white">
                  Objetivos ODS
                </NavLink>
              </li>
              <li>
                <NavLink to="/contato" className="text-white/80 transition-colors hover:text-white">
                  Contato
                </NavLink>
              </li>
              <li>
                <NavLink to="/privacidade" className="text-white/80 transition-colors hover:text-white">
                  Política de Privacidade
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-bold text-white">Redes Sociais</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white transition-colors hover:opacity-90"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white transition-colors hover:opacity-90"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white transition-colors hover:opacity-90"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white transition-colors hover:opacity-90"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/80">
          <p>© 2025 Estado de São Paulo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
