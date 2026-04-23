import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import { Layers, CheckCircle2, ArrowRight } from "lucide-react"
import { NavLink } from "react-router-dom"

const ETAPAS = [
  {
    numero: "01",
    titulo: "Levantamento e Cadastro de Ações",
    descricao:
      "Gestores municipais e atores locais registram iniciativas de sustentabilidade, indicando o ODS relacionado, a área temática, o público beneficiado e o estágio de implementação.",
    cor: "bg-primary",
  },
  {
    numero: "02",
    titulo: "Validação e Curadoria",
    descricao:
      "As ações cadastradas passam por processo de curadoria pela equipe do Mirante, garantindo consistência com os indicadores dos ODS e alinhamento com as diretrizes do Estado de São Paulo.",
    cor: "bg-accent",
  },
  {
    numero: "03",
    titulo: "Classificação por ODS e Temas",
    descricao:
      "Cada ação é vinculada aos ODS correspondentes (1 a 17) e classificada por eixos temáticos — como energia, resíduos, água, habitação e biodiversidade — para facilitar a comparação entre municípios.",
    cor: "bg-primary",
  },
  {
    numero: "04",
    titulo: "Cálculo de Indicadores",
    descricao:
      "Com base nas ações registradas e nos dados secundários disponíveis (IBGE, SEADE, SNIS), o sistema calcula indicadores de desempenho municipal para cada dimensão de sustentabilidade.",
    cor: "bg-accent",
  },
  {
    numero: "05",
    titulo: "Publicação e Visualização",
    descricao:
      "Os dados são disponibilizados em mapas interativos, painéis e relatórios públicos, permitindo comparações regionais e a identificação de boas práticas para replicação.",
    cor: "bg-primary",
  },
]

const PRINCIPIOS = [
  {
    titulo: "Transparência",
    descricao: "Todos os dados e metodologias de cálculo são públicos e documentados.",
  },
  {
    titulo: "Participação",
    descricao: "Qualquer ator (público, privado ou da sociedade civil) pode contribuir com informações e relatos.",
  },
  {
    titulo: "Territorialidade",
    descricao: "A análise é centrada nos 645 municípios do Estado de São Paulo, respeitando especificidades locais.",
  },
  {
    titulo: "Alinhamento com ODS",
    descricao:
      "Todo o framework é construído sobre os 17 Objetivos de Desenvolvimento Sustentável da Agenda 2030 da ONU.",
  },
  {
    titulo: "Rigor Técnico",
    descricao:
      "Os indicadores seguem padrões metodológicos reconhecidos (IPEA, PNUD, IBGE) e são revisados periodicamente.",
  },
  {
    titulo: "Replicabilidade",
    descricao: "As boas práticas identificadas são documentadas de forma que possam ser adaptadas por outros municípios.",
  },
]

export default function MetodologiaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-slate-50 border-b border-border py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Layers className="h-4 w-4" />
                Como funciona
              </div>
              <h1 className="mb-3 font-heading text-4xl font-bold text-foreground">Metodologia</h1>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                Entenda como o Mirante da Sustentabilidade coleta, valida, organiza e disponibiliza os dados sobre
                iniciativas sustentáveis nos municípios paulistas, com base nos Objetivos de Desenvolvimento Sustentável
                (ODS).
              </p>
            </div>
          </div>
        </section>

        {/* Base conceitual */}
        <section className="py-14 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">Base Conceitual</h2>
                <p className="mb-4 text-muted-foreground leading-relaxed text-pretty">
                  O Mirante da Sustentabilidade é estruturado a partir do marco da{" "}
                  <strong>Agenda 2030 da ONU</strong> e dos seus 17 Objetivos de Desenvolvimento Sustentável (ODS),
                  complementado pelas políticas estaduais do Estado de São Paulo para desenvolvimento territorial
                  sustentável.
                </p>
                <p className="mb-4 text-muted-foreground leading-relaxed text-pretty">
                  A abordagem é <strong>territorial e participativa</strong>: reconhecemos que cada município possui
                  realidades distintas e que a transformação sustentável depende do engajamento de múltiplos atores —
                  governo, sociedade civil, academia e setor privado.
                </p>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  Utilizamos como referências metodológicas o{" "}
                  <strong>Índice de Desenvolvimento Sustentável das Cidades (IDSC)</strong>, o{" "}
                  <strong>Atlas do Desenvolvimento Humano</strong> e os indicadores do{" "}
                  <strong>Sistema Nacional de Informações sobre Saneamento (SNIS)</strong>.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="mb-4 text-base font-semibold text-foreground">Os 6 Princípios Orientadores</h3>
                <ul className="space-y-4">
                  {PRINCIPIOS.map((p) => (
                    <li key={p.titulo} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <span className="text-sm font-semibold text-foreground">{p.titulo}: </span>
                        <span className="text-sm text-muted-foreground">{p.descricao}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Etapas */}
        <section className="py-14 border-b border-border bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="font-heading text-2xl font-bold text-foreground">Fluxo Metodológico</h2>
              <p className="mt-2 text-muted-foreground">Como as informações são coletadas, processadas e publicadas</p>
            </div>
            <div className="relative mx-auto max-w-2xl">
              {/* Linha vertical */}
              <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-border hidden sm:block" />
              <div className="space-y-8">
                {ETAPAS.map((etapa) => (
                  <div key={etapa.numero} className="flex gap-5">
                    <div
                      className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${etapa.cor} text-primary-foreground font-bold text-lg shadow-md`}
                    >
                      {etapa.numero}
                    </div>
                    <div className="rounded-xl border border-border bg-card p-5 shadow-sm flex-1">
                      <h3 className="mb-1 text-sm font-bold text-foreground">{etapa.titulo}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{etapa.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Fontes de dados */}
        <section className="py-14">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 font-heading text-2xl font-bold text-foreground text-center">Principais Fontes de Dados</h2>
            <div className="mx-auto max-w-3xl grid gap-4 sm:grid-cols-2">
              {[
                { nome: "IBGE – Instituto Brasileiro de Geografia e Estatística", area: "Dados socioeconômicos e territoriais" },
                { nome: "SEADE – Fundação Sistema Estadual de Análise de Dados", area: "Indicadores estaduais de SP" },
                { nome: "SNIS – Sistema Nacional de Informações sobre Saneamento", area: "Dados de água, esgoto e resíduos" },
                { nome: "IPEA – Instituto de Pesquisa Econômica Aplicada", area: "Indicadores ODS e desigualdade" },
                { nome: "PNUD Brasil – Programa das Nações Unidas para o Desenvolvimento", area: "Metodologia IDH e ODS" },
                { nome: "Secretaria de Infraestrutura e Meio Ambiente do Estado de SP", area: "Dados ambientais estaduais" },
              ].map((f) => (
                <div key={f.nome} className="rounded-lg border border-border bg-card p-4">
                  <p className="text-sm font-semibold text-foreground">{f.nome}</p>
                  <p className="text-xs text-muted-foreground mt-1">{f.area}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="mb-4 text-sm text-muted-foreground">
                Quer entender melhor os dados ou contribuir com informações do seu município?
              </p>
              <NavLink
                to="/forum"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Participar do Fórum
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
