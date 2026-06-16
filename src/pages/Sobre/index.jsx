import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import { Info, Network, GitCompareArrows, Database, ArrowRight } from "lucide-react"
import { NavLink } from "react-router-dom"

const ABORDAGEM = [
  {
    titulo: "Mapeamento de atores",
    descricao:
      "Identificação dos atores públicos, privados e científicos envolvidos na sustentabilidade municipal e das relações entre eles.",
    icone: Network,
  },
  {
    titulo: "Análise de coerência de políticas",
    descricao:
      "Avaliação do alinhamento e da consistência entre políticas e instrumentos voltados ao desenvolvimento sustentável.",
    icone: GitCompareArrows,
  },
  {
    titulo: "Fluxos e lacunas de informação",
    descricao:
      "Identificação de como os dados circulam entre instituições e onde estão as lacunas informacionais a superar.",
    icone: Database,
  },
  {
    titulo: "Solução tecnológica para decisão",
    descricao:
      "Desenvolvimento de solução orientada ao monitoramento e ao apoio à decisão em sustentabilidade territorial.",
    icone: Info,
  },
]

export default function SobrePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-slate-50 border-b border-border py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Info className="h-4 w-4" />
                O projeto
              </div>
              <h1 className="mb-3 font-heading text-4xl font-bold text-foreground">Sobre</h1>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                <strong>Mirante da Sustentabilidade: Conexões Interdisciplinares para uma SP Sustentável</strong> é um
                projeto voltado ao desenvolvimento de um protótipo de plataforma digital interdisciplinar para
                organização, integração e intercâmbio de dados e informações sobre sustentabilidade em municípios do
                Estado de São Paulo.
              </p>
            </div>
          </div>
        </section>

        {/* Motivação */}
        <section className="py-14 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">Motivação</h2>
                <p className="mb-4 text-muted-foreground leading-relaxed text-pretty">
                  A iniciativa parte do reconhecimento de que a implementação dos{" "}
                  <strong>Objetivos de Desenvolvimento Sustentável</strong> requer instrumentos capazes de superar
                  lacunas informacionais, fragmentação institucional e baixa articulação entre atores públicos,
                  privados e científicos.
                </p>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  O projeto adota uma <strong>abordagem aplicada e interdisciplinar</strong>, combinando diferentes
                  frentes de trabalho para diagnosticar o cenário atual e propor uma resposta tecnológica concreta às
                  necessidades dos municípios paulistas.
                </p>
              </div>

              <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-6 shadow-sm">
                <h3 className="mb-2 text-base font-semibold text-foreground">Resultado esperado</h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                  Como resultado esperado, a plataforma vai atuar como <strong>hub digital de conhecimento e
                  governança</strong>, contribuindo para fortalecer a cooperação intersetorial e multiatores e apoiar
                  políticas territorialmente sensíveis de sustentabilidade em municípios paulistas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Abordagem */}
        <section className="py-14 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="font-heading text-2xl font-bold text-foreground">Abordagem do Projeto</h2>
              <p className="mt-2 text-muted-foreground">
                Frentes de trabalho que articulam diagnóstico e desenvolvimento da plataforma
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
              {ABORDAGEM.map((item) => {
                const Icon = item.icone
                return (
                  <div key={item.titulo} className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-sm font-bold text-foreground">{item.titulo}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.descricao}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-12 text-center">
              <p className="mb-4 text-sm text-muted-foreground">
                Conheça como os dados são coletados, validados e disponibilizados.
              </p>
              <NavLink
                to="/metodologia"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Ver a Metodologia
                <ArrowRight className="h-4 w-4" />
              </NavLink>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
