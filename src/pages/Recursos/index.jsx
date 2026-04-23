import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import { BookOpen, Download, ExternalLink, FileText, Video, Globe, Filter } from "lucide-react"
import { useState } from "react"

const RECURSOS = [
  {
    id: 1,
    tipo: "Guia",
    icone: "FileText",
    titulo: "Guia de Implementação dos ODS nos Municípios",
    descricao:
      "Manual prático para gestores públicos municipais iniciarem a adaptação dos Objetivos de Desenvolvimento Sustentável nas políticas locais.",
    fonte: "PNUD Brasil",
    link: "https://www.undp.org/pt/brazil",
    destaque: true,
  },
  {
    id: 2,
    tipo: "Relatório",
    icone: "BookOpen",
    titulo: "Relatório ODS Brasil 2024",
    descricao:
      "Avaliação nacional do progresso nas metas dos ODS com foco em dados estaduais e municipais.",
    fonte: "IPEA",
    link: "https://www.ipea.gov.br",
    destaque: true,
  },
  {
    id: 3,
    tipo: "Ferramenta",
    icone: "Globe",
    titulo: "Plataforma ODSBR – Painel de Monitoramento",
    descricao:
      "Ferramenta online para consulta de indicadores dos ODS desagregados por estado e município brasileiro.",
    fonte: "Governo Federal",
    link: "https://odsbrasil.gov.br",
    destaque: false,
  },
  {
    id: 4,
    tipo: "Vídeo",
    icone: "Video",
    titulo: "Série: Municípios Sustentáveis – Casos de Sucesso",
    descricao:
      "Coletânea de vídeos documentais com experiências de municípios paulistas que implementaram ações de impacto em sustentabilidade.",
    fonte: "Secretaria de Infraestrutura e Meio Ambiente SP",
    link: "#",
    destaque: false,
  },
  {
    id: 5,
    tipo: "Guia",
    icone: "FileText",
    titulo: "Kit de Ferramentas para Cidades Resilientes",
    descricao:
      "Conjunto de metodologias e instrumentos para planejamento urbano resiliente e adaptação às mudanças climáticas.",
    fonte: "ONU-Habitat",
    link: "https://unhabitat.org",
    destaque: false,
  },
  {
    id: 6,
    tipo: "Relatório",
    icone: "BookOpen",
    titulo: "Índice de Sustentabilidade dos Municípios Paulistas",
    descricao:
      "Ranking e análise detalhada dos 645 municípios do estado de São Paulo com base em indicadores ambientais, sociais e econômicos.",
    fonte: "SEADE",
    link: "https://www.seade.gov.br",
    destaque: false,
  },
  {
    id: 7,
    tipo: "Ferramenta",
    icone: "Globe",
    titulo: "GeoSampa – Dados Geoespaciais de São Paulo",
    descricao:
      "Portal de dados geoespaciais abertos do estado de São Paulo com camadas ambientais, de saneamento e infraestrutura.",
    fonte: "EMPLASA",
    link: "https://geosampa.prefeitura.sp.gov.br",
    destaque: false,
  },
  {
    id: 8,
    tipo: "Guia",
    icone: "FileText",
    titulo: "Guia de Compras Públicas Sustentáveis",
    descricao:
      "Orientações para prefeituras incorporarem critérios ambientais e sociais nos processos licitatórios, conforme a legislação vigente.",
    fonte: "Ministério do Meio Ambiente",
    link: "#",
    destaque: false,
  },
]

const TIPOS = ["Todos", "Guia", "Relatório", "Ferramenta", "Vídeo"]

const iconMap = {
  FileText: FileText,
  BookOpen: BookOpen,
  Globe: Globe,
  Video: Video,
}

export default function RecursosPage() {
  const [tipoAtivo, setTipoAtivo] = useState("Todos")

  const filtrados = RECURSOS.filter((r) => tipoAtivo === "Todos" || r.tipo === tipoAtivo)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-slate-50 border-b border-border py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-md bg-accent/10 px-3 py-1 text-sm font-medium text-accent-foreground">
                <BookOpen className="h-4 w-4" />
                Biblioteca de Recursos
              </div>
              <h1 className="mb-3 font-heading text-4xl font-bold text-foreground">Recursos</h1>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                Guias, relatórios, ferramentas e materiais de referência para apoiar gestores públicos, pesquisadores e
                organizações na implementação de ações sustentáveis nos municípios paulistas.
              </p>
            </div>
          </div>
        </section>

        {/* Destaques */}
        <section className="py-10 border-b border-border">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 font-heading text-xl font-bold text-foreground">Em Destaque</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {RECURSOS.filter((r) => r.destaque).map((r) => {
                const Icon = iconMap[r.icone] || FileText
                return (
                  <a
                    key={r.id}
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-4 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="mb-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        {r.tipo}
                      </span>
                      <h3 className="text-sm font-semibold text-foreground leading-snug">{r.titulo}</h3>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{r.descricao}</p>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs text-primary font-medium">
                        <ExternalLink className="h-3 w-3" /> {r.fonte}
                      </span>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </section>

        {/* Todos os recursos */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            {/* Filtro */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {TIPOS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTipoAtivo(t)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    tipoAtivo === t
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtrados.map((r) => {
                const Icon = iconMap[r.icone] || FileText
                return (
                  <a
                    key={r.id}
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {r.tipo}
                      </span>
                    </div>
                    <h3 className="mb-1 text-sm font-semibold text-foreground leading-snug">{r.titulo}</h3>
                    <p className="mb-3 flex-1 text-xs text-muted-foreground leading-relaxed">{r.descricao}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{r.fonte}</span>
                      <ExternalLink className="h-3.5 w-3.5 text-primary" />
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
