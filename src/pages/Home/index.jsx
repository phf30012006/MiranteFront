import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import { Box, Button } from "@mui/material"
import { Card, CardContent, CardActions } from "@mui/material"
import { Badge } from "@mui/material"
import { Link, NavLink } from "react-router-dom"
import { MapPin, TrendingUp, FileText, BarChart3, ArrowRight, Target, Users, Building2, Newspaper } from "lucide-react"
import { Leaf } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-foreground via-foreground to-foreground/90 py-24 text-primary-foreground">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url('/abstract-map-of-sao-paulo-state-topographic-lines.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-6 bg-accent text-accent-foreground rounded-md px-2 py-1 inline-flex items-center" variant="secondary">
                <Leaf className="mr-2 h-4 w-4" />
                Objetivos de Desenvolvimento Sustentável
              </Badge>
              <h1 className="mb-6 font-heading text-5xl font-bold leading-tight text-balance md:text-6xl">
                Acompanhe as iniciativas de sustentabilidade nos municípios paulistas
              </h1>
              <p className="mb-8 text-lg text-primary-foreground/90 leading-relaxed text-pretty">
                O Mirante da Sustentabilidade é uma plataforma do Governo do Estado de São Paulo para organizar,
                integrar e divulgar informações sobre ações sustentáveis baseadas nos ODS.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <NavLink
                  to="/mapa"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-md font-medium"
                >
                  Explorar Mapa
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NavLink>

                <NavLink
                  to="/sobre"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 text-md font-medium"
                >
                  Saiba Mais
                </NavLink>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 font-heading text-4xl font-bold text-primary">645</div>
                <div className="text-sm text-muted-foreground">Municípios Cadastrados</div>
              </div>
              <div className="text-center">
                <div className="mb-2 font-heading text-4xl font-bold text-primary">2.847</div>
                <div className="text-sm text-muted-foreground">Ações Sustentáveis</div>
              </div>
              <div className="text-center">
                <div className="mb-2 font-heading text-4xl font-bold text-primary">17</div>
                <div className="text-sm text-muted-foreground">Objetivos ODS</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-heading text-3xl font-bold text-balance text-primary">Destaques</h2>
              <p className="text-muted-foreground text-pretty">
                Acompanhe as principais iniciativas e indicadores de sustentabilidade
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="rounded-xl p-6 shadow-sm bg-card transition-shadow hover:shadow-lg">
                <div className="p-0 mb-4">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold">Municípios com Mais Ações</h2>
                  <p className="text-sm text-muted-foreground mt-1">Cidades que mais implementaram iniciativas sustentáveis</p>
                </div>
                <CardContent className="p-0">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center justify-between">
                      <span className="text-sm font-medium">São Paulo</span>
                      <span className="inline-flex items-center rounded-full bg-card text-card-foreground px-3 py-1 text-sm">342 ações</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm font-medium">Campinas</span>
                      <span className="inline-flex items-center rounded-full bg-card text-card-foreground px-3 py-1 text-sm">187 ações</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm font-medium">Santos</span>
                      <span className="inline-flex items-center rounded-full bg-card text-card-foreground px-3 py-1 text-sm">156 ações</span>
                    </li>
                  </ul>
                  <div className="flex justify-center">
                    <NavLink to="/acoes" className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium">
                      Ver Todas as Ações
                      <ArrowRight className="ml-3 h-4 w-4" />
                    </NavLink>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl p-6 shadow-sm bg-card transition-shadow hover:shadow-lg">
                <div className="mb-4">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold">Indicadores em Alta</h2>
                  <p className="text-sm text-muted-foreground mt-1">Métricas de sustentabilidade com melhor desempenho</p>
                </div>
                <CardContent className="p-0">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center justify-between">
                      <span className="text-sm font-medium">Energia Renovável</span>
                      <span className="inline-flex items-center rounded-md bg-accent text-accent-foreground px-3 py-1 text-sm">+23%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm font-medium">Coleta Seletiva</span>
                      <span className="inline-flex items-center rounded-md bg-accent text-accent-foreground px-3 py-1 text-sm">+18%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-sm font-medium">Áreas Verdes</span>
                      <span className="inline-flex items-center rounded-md bg-accent text-accent-foreground px-3 py-1 text-sm">+15%</span>
                    </li>
                  </ul>
                  <div className="flex justify-center">
                    <NavLink to="/indicadores" className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-accent text-accent-foreground hover:bg-accent/90 text-base font-medium">
                      Ver Dashboard
                      <ArrowRight className="ml-3 h-4 w-4" />
                    </NavLink>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl p-6 shadow-sm bg-card transition-shadow hover:shadow-lg">
                <div className="mb-4">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Newspaper className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold">Notícias Sustentáveis</h2>
                  <p className="text-sm text-muted-foreground mt-1">Últimas novidades sobre sustentabilidade no estado</p>
                </div>
                <CardContent className="p-0">
                  <ul className="space-y-4 mb-8">
                    <li>
                      <p className="text-sm font-medium leading-relaxed">Campinas inaugura maior parque solar municipal</p>
                      <span className="text-xs text-muted-foreground">Há 2 dias</span>
                    </li>
                    <li>
                      <p className="text-sm font-medium leading-relaxed">São Paulo amplia rede de ciclovias em 50km</p>
                      <span className="text-xs text-muted-foreground">Há 4 dias</span>
                    </li>
                  </ul>
                  <div className="flex justify-center">
                    <NavLink to="/noticias" className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium">
                      Ver Todas as Notícias
                      <ArrowRight className="ml-3 h-4 w-4" />
                    </NavLink>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <Badge className="mb-4 bg-accent/10 text-accent-foreground rounded-md px-2 py-1 inline-flex items-center" variant="secondary">
                  <MapPin className="mr-2 h-3 w-3 text-chart-2" />
                  <p className="text-sm text-chart-2">Mapa Interativo</p>
                </Badge>
                <h2 className="mb-4 font-heading text-3xl font-bold text-balance">
                  Explore as iniciativas por município
                </h2>
                <p className="mb-6 text-muted-foreground leading-relaxed text-pretty">
                  Navegue pelo mapa do Estado de São Paulo e descubra as ações sustentáveis implementadas em cada
                  município. Filtre por ODS, tema e período para encontrar informações específicas.
                </p>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                    </div>
                    <span className="text-sm leading-relaxed">Visualização por município com dados em tempo real</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                    </div>
                    <span className="text-sm leading-relaxed">Filtros avançados por ODS, tema e período</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                    </div>
                    <span className="text-sm leading-relaxed">Informações detalhadas ao passar o mouse</span>
                  </li>
                </ul>
                <div className="flex justify-flex-start">
                    <NavLink to="/mapa" className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium">
                      Acessar Mapa Completo
                      <ArrowRight className="ml-3 h-4 w-4" />
                    </NavLink>
                  </div>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
                <img
                  src="/stylized-map-of-sao-paulo-state-with-data-points.jpg"
                  alt="Mapa do Estado de São Paulo"
                  className="h-full w-full "
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="!rounded-2xl !border !border-primary/30 !bg-gradient-to-br !from-primary/5 !to-transparent p-6 shadow-md transition hover:shadow-lg">
                <div className="mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mb-4">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">Para Gestores Públicos</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Cadastre e acompanhe as ações de sustentabilidade do seu município
                  </p>
                </div>
                <CardContent className="p-0 mt-4">
                  <NavLink
                    to="/cadastro"
                    className="block w-full rounded-lg bg-white py-3 text-center text-sm font-medium border border-secondary shadow-sm hover:shadow-md transition"
                  >
                    Cadastrar Município
                  </NavLink>
                </CardContent>
              </Card>

              <Card className="!rounded-2xl !border !border-accent/30 !bg-gradient-to-br !from-accent/5 !to-transparent p-6 shadow-sm">
                <div className="mb-4">
                  <div className="h-10 w-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center mb-4">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">Para Pesquisadores</h3>
                  <p className="text-sm text-muted-foreground mt-2">Acesse dados e indicadores para pesquisas sobre sustentabilidade</p>
                </div>
                <CardContent className="p-0 mt-4">
                  <NavLink to="/indicadores" className="block w-full rounded-lg bg-white py-3 text-center text-sm font-medium border border-secondary shadow-sm hover:shadow-md">
                    Acessar Dados
                  </NavLink>
                </CardContent>
              </Card>

              <Card className="!rounded-2xl !border !border-primary/30 !bg-gradient-to-br !from-primary/5 !to-transparent p-6 shadow-sm">
                <div className="mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mb-4">
                    <Leaf className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">Para Cidadãos</h3>
                  <p className="text-sm text-muted-foreground mt-2">Conheça as iniciativas sustentáveis da sua cidade e região</p>
                </div>
                <CardContent className="p-0 mt-9">
                  <NavLink to="/mapa" className="block w-full rounded-lg bg-white py-3 text-center text-sm font-medium border border-secondary shadow-sm hover:shadow-md">
                    Explorar Ações
                  </NavLink>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
