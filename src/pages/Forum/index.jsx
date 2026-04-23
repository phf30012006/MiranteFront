import { useState } from "react"
import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import { MessageCircle, ThumbsUp, Users, Search, PlusCircle, Tag } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { NavLink } from "react-router-dom"

const TOPICOS_MOCK = [
  {
    id: 1,
    titulo: "Boas práticas de compostagem urbana em municípios pequenos",
    autor: "Prefeitura de Itu",
    tag: "Resíduos",
    curtidas: 14,
    respostas: 8,
    data: "2026-04-10",
    resumo:
      "Compartilhamos nossa experiência com a implementação de ponto de compostagem no centro da cidade e gostaríamos de ouvir outros casos.",
  },
  {
    id: 2,
    titulo: "Como integrar ODS 11 nas políticas de habitação?",
    autor: "Pesquisadora UNICAMP",
    tag: "Habitação",
    curtidas: 22,
    respostas: 15,
    data: "2026-04-08",
    resumo:
      "Discussão sobre caminhos para alinhar planos diretores municipais com as metas do ODS 11 (Cidades e Comunidades Sustentáveis).",
  },
  {
    id: 3,
    titulo: "Parceria público-privada para energia solar em escolas",
    autor: "Secretaria de Educação SP",
    tag: "Energia",
    curtidas: 31,
    respostas: 20,
    data: "2026-04-05",
    resumo:
      "Apresentamos o modelo de PPP que reduziu a conta de energia em 40% em 12 escolas estaduais. Aberto para dúvidas e replicação.",
  },
  {
    id: 4,
    titulo: "Desafios na coleta seletiva em municípios rurais",
    autor: "Prefeitura de Ibiúna",
    tag: "Resíduos",
    curtidas: 9,
    respostas: 6,
    data: "2026-04-03",
    resumo:
      "Relatamos os obstáculos logísticos e financeiros enfrentados e pedimos sugestões de outros municípios com perfil similar.",
  },
  {
    id: 5,
    titulo: "Monitoramento de qualidade da água com sensores IoT",
    autor: "Instituto de Pesquisas Tecnológicas de SP (IPT)",
    tag: "Água",
    curtidas: 18,
    respostas: 11,
    data: "2026-03-28",
    resumo:
      "Apresentamos projeto-piloto de monitoramento de rios paulistas com sensores de baixo custo e buscamos parceiros para expansão.",
  },
]

const TAGS = ["Todos", "Resíduos", "Energia", "Água", "Habitação", "Biodiversidade", "Clima", "Outros"]

export default function ForumPage() {
  const { user } = useAuth()
  const [busca, setBusca] = useState("")
  const [tagAtiva, setTagAtiva] = useState("Todos")

  const topicosFiltrados = TOPICOS_MOCK.filter((t) => {
    const matchBusca =
      t.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      t.resumo.toLowerCase().includes(busca.toLowerCase()) ||
      t.autor.toLowerCase().includes(busca.toLowerCase())
    const matchTag = tagAtiva === "Todos" || t.tag === tagAtiva
    return matchBusca && matchTag
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-slate-50 border-b border-border py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                <Users className="h-4 w-4" />
                Conexão entre Atores
              </div>
              <h1 className="mb-3 font-heading text-4xl font-bold text-foreground">Fórum de Sustentabilidade</h1>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                Espaço colaborativo para gestores públicos, pesquisadores, organizações e cidadãos trocarem
                experiências, tirarem dúvidas e construírem soluções para os desafios da sustentabilidade nos
                municípios paulistas.
              </p>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-4">
            {/* Barra de ações */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar tópicos..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              {user ? (
                <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  <PlusCircle className="h-4 w-4" />
                  Novo Tópico
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5"
                >
                  Entre para participar
                </NavLink>
              )}
            </div>

            {/* Tags */}
            <div className="mb-6 flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setTagAtiva(tag)}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition ${
                    tagAtiva === tag
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </button>
              ))}
            </div>

            {/* Lista de tópicos */}
            <div className="space-y-4">
              {topicosFiltrados.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground">Nenhum tópico encontrado.</div>
              ) : (
                topicosFiltrados.map((topico) => (
                  <div
                    key={topico.id}
                    className="rounded-xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md cursor-pointer"
                  >
                    <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <span className="mb-1 inline-block rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent-foreground">
                          {topico.tag}
                        </span>
                        <h2 className="text-base font-semibold text-foreground leading-snug">{topico.titulo}</h2>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(topico.data).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{topico.resumo}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{topico.autor}</span>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3.5 w-3.5" />
                          {topico.curtidas}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3.5 w-3.5" />
                          {topico.respostas} respostas
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
