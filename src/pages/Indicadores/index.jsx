import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import { BarChart3, Check, Minus, Info } from "lucide-react"

const MUNICIPIOS = [
  { nome: "Sorocaba", imn: 29.3, cobertura: 50.0, profundidade: 8.6, ene: false, mob: false, perfil: "Baixo 25-34%" },
  { nome: "São José dos Campos", imn: 30.9, cobertura: 50.0, profundidade: 11.8, ene: false, mob: false, perfil: "Baixo 25-34%" },
  { nome: "São Caetano do Sul", imn: 31.2, cobertura: 50.0, profundidade: 12.4, ene: false, mob: false, perfil: "Baixo 25-34%" },
  { nome: "São José do Rio Preto", imn: 37.0, cobertura: 50.0, profundidade: 23.9, ene: false, mob: false, perfil: "Médio 35-49%" },
  { nome: "Marília", imn: 37.8, cobertura: 50.0, profundidade: 25.7, ene: false, mob: false, perfil: "Médio 35-49%" },
  { nome: "Ribeirão Preto", imn: 38.2, cobertura: 50.0, profundidade: 26.4, ene: false, mob: false, perfil: "Médio 35-49%" },
  { nome: "Paulínia", imn: 42.4, cobertura: 66.7, profundidade: 18.1, ene: false, mob: false, perfil: "Médio 35-49%" },
  { nome: "Piracicaba", imn: 45.1, cobertura: 66.7, profundidade: 23.5, ene: false, mob: false, perfil: "Médio 35-49%" },
  { nome: "Jundiaí", imn: 49.2, cobertura: 66.7, profundidade: 31.6, ene: false, mob: false, perfil: "Médio 35-49%" },
  { nome: "Santos", imn: 52.4, cobertura: 66.7, profundidade: 38.1, ene: true, mob: false, perfil: "Médio-alto 50-69%" },
  { nome: "Presidente Prudente", imn: 54.0, cobertura: 66.7, profundidade: 41.4, ene: false, mob: false, perfil: "Médio-alto 50-69%" },
  { nome: "Americana", imn: 55.2, cobertura: 66.7, profundidade: 43.6, ene: false, mob: true, perfil: "Médio-alto 50-69%" },
  { nome: "Campinas", imn: 56.4, cobertura: 66.7, profundidade: 46.2, ene: false, mob: true, perfil: "Médio-alto 50-69%" },
  { nome: "Bauru", imn: 80.8, cobertura: 100.0, profundidade: 61.6, ene: true, mob: true, perfil: "Alto ≥70%" },
  { nome: "São Paulo", imn: 87.3, cobertura: 100.0, profundidade: 74.5, ene: true, mob: true, perfil: "Alto ≥70%" },
]

const MEDIA_CORPUS = 48.5

const PERFIL_ESTILO = {
  "Alto ≥70%": "#D8F3DC",
  "Médio-alto 50-69%": "#D4EFDF",
  "Médio 35-49%": "#FEF9E7",
  "Baixo 25-34%": "#FDEBD0",
  "Crítico <25%": "#FADBD8",
}

const fmt = (v) => `${v.toFixed(1)}%`

const SETORES = {
  ENE: { nome: "ENE", cor: "#E74C3C", completo: "Eletricidade e Gás" },
  MOB: { nome: "MOB", cor: "#E67E22", completo: "Transporte e Mobilidade" },
  RES: { nome: "RES", cor: "#2E86AB", completo: "Resíduos e Saneamento" },
  CON: { nome: "CON", cor: "#F39C12", completo: "Construção e Uso do Solo" },
  AGR: { nome: "AGR", cor: "#27AE60", completo: "Agricultura e Florestas" },
  SOC: { nome: "SOC", cor: "#8E44AD", completo: "Serviços Sociais e Governança" },
}

const MARCOS = [
  { ano: 1997, nome: "Lei Recursos Hídricos", cor: "#9aa0a6" },
  { ano: 2001, nome: "Estatuto da Cidade", cor: "#9aa0a6" },
  { ano: 2009, nome: "PNMC", cor: "#b0b4b8" },
  { ano: 2010, nome: "PNRS", cor: "#7fa8c9" },
  { ano: 2015, nome: "Agenda 2030", cor: "#7bbf8a" },
  { ano: 2016, nome: "Acordo de Paris", cor: "#e69aa0" },
  { ano: 2025, nome: "TSB", cor: "#b79fd1" },
]

const ANO_MIN = 1965
const ANO_MAX = 2026
const ANOS_EIXO = [1965, 1975, 1985, 1995, 2005, 2015, 2025]
const PLOT_INSET = 2
const pct = (ano) => PLOT_INSET + ((ano - ANO_MIN) / (ANO_MAX - ANO_MIN)) * (100 - 2 * PLOT_INSET)

const SLOT = 15
const layoutMunicipio = (eventos) => {
  const porAno = {}
  eventos.forEach(([ano, setor]) => {
    ;(porAno[ano] ||= []).push(setor)
  })
  const maxPilha = Math.max(1, ...Object.values(porAno).map((s) => s.length))
  const altura = maxPilha * SLOT + 8
  const pontos = []
  Object.entries(porAno).forEach(([ano, setores]) => {
    const n = setores.length
    setores.forEach((setor, i) => {
      pontos.push({ ano: Number(ano), setor, top: altura / 2 + (i - (n - 1) / 2) * SLOT })
    })
  })
  return { altura, pontos }
}

const EVENTOS = [
  { nome: "Americana", nota: "MOB:1", eventos: [[2003, "SOC"], [2003, "SOC"], [2004, "SOC"], [2008, "CON"], [2008, "SOC"], [2010, "SOC"], [2013, "SOC"], [2014, "SOC"], [2016, "CON"], [2016, "RES"], [2016, "SOC"], [2017, "RES"], [2017, "RES"], [2017, "SOC"], [2017, "SOC"], [2018, "CON"], [2019, "RES"], [2020, "CON"], [2020, "CON"], [2021, "MOB"], [2022, "CON"], [2024, "RES"], [2025, "SOC"], [2026, "RES"]] },
  { nome: "Bauru", nota: "ENE:1 MOB:2", eventos: [[1994, "SOC"], [2009, "RES"], [2010, "SOC"], [2011, "RES"], [2011, "SOC"], [2013, "SOC"], [2013, "SOC"], [2015, "RES"], [2015, "SOC"], [2015, "SOC"], [2016, "AGR"], [2016, "ENE"], [2016, "RES"], [2016, "RES"], [2021, "SOC"], [2022, "SOC"], [2023, "MOB"], [2024, "MOB"], [2024, "SOC"]] },
  { nome: "Campinas", eventos: [[2001, "SOC"], [2001, "SOC"], [2003, "SOC"], [2006, "SOC"], [2013, "RES"], [2013, "SOC"], [2014, "RES"], [2015, "CON"], [2015, "CON"], [2015, "SOC"], [2015, "SOC"], [2015, "SOC"], [2016, "SOC"], [2016, "SOC"], [2017, "SOC"], [2018, "CON"], [2019, "CON"], [2020, "SOC"], [2020, "SOC"], [2020, "SOC"], [2020, "SOC"], [2021, "RES"], [2022, "CON"], [2022, "SOC"], [2023, "SOC"], [2024, "RES"]] },
  { nome: "Jundiaí", eventos: [[1980, "RES"], [1980, "SOC"], [1983, "SOC"], [1990, "SOC"], [1991, "SOC"], [1993, "AGR"], [1994, "SOC"], [1998, "SOC"], [2001, "RES"], [2001, "RES"], [2003, "SOC"], [2004, "CON"], [2007, "SOC"], [2008, "SOC"], [2010, "CON"], [2010, "SOC"], [2011, "SOC"], [2012, "SOC"], [2012, "SOC"], [2016, "CON"], [2016, "SOC"], [2017, "SOC"], [2018, "RES"], [2018, "SOC"], [2018, "SOC"], [2018, "SOC"], [2019, "CON"], [2021, "SOC"], [2022, "AGR"], [2024, "SOC"], [2025, "RES"]] },
  { nome: "Marília", eventos: [[1994, "SOC"], [1995, "SOC"], [2004, "RES"], [2007, "SOC"], [2008, "AGR"], [2008, "SOC"], [2009, "SOC"], [2011, "AGR"], [2011, "AGR"], [2015, "SOC"], [2021, "SOC"]] },
  { nome: "Paulínia", eventos: [[1997, "SOC"], [2006, "SOC"], [2007, "CON"], [2015, "AGR"], [2015, "RES"], [2015, "RES"], [2015, "SOC"], [2015, "SOC"], [2018, "RES"], [2020, "SOC"], [2023, "SOC"], [2024, "SOC"], [2024, "SOC"]] },
  { nome: "Piracicaba", eventos: [[1996, "SOC"], [1996, "SOC"], [2003, "SOC"], [2006, "CON"], [2010, "SOC"], [2010, "SOC"], [2011, "SOC"], [2014, "SOC"], [2018, "SOC"], [2020, "RES"], [2020, "RES"], [2020, "SOC"], [2020, "SOC"], [2022, "SOC"], [2025, "RES"], [2026, "RES"]] },
  { nome: "Presidente Prudente", eventos: [[1994, "SOC"], [1994, "SOC"], [1997, "AGR"], [1997, "SOC"], [1997, "SOC"], [1999, "CON"], [1999, "SOC"], [2000, "AGR"], [2000, "CON"], [2001, "CON"], [2001, "SOC"], [2002, "AGR"], [2003, "CON"], [2003, "SOC"], [2003, "SOC"], [2003, "SOC"], [2005, "SOC"], [2005, "SOC"], [2006, "SOC"], [2010, "AGR"], [2010, "AGR"], [2011, "CON"], [2011, "SOC"], [2012, "SOC"], [2023, "CON"], [2025, "CON"], [2025, "RES"], [2025, "SOC"]] },
  { nome: "Ribeirão Preto", eventos: [[2003, "SOC"], [2004, "SOC"], [2012, "RES"], [2012, "SOC"], [2014, "SOC"], [2016, "RES"], [2018, "CON"], [2018, "SOC"], [2018, "SOC"], [2020, "RES"], [2020, "SOC"], [2020, "SOC"], [2023, "CON"], [2023, "RES"], [2024, "RES"]] },
  { nome: "Santos", nota: "ENE:1", eventos: [[2004, "SOC"], [2009, "SOC"], [2011, "CON"], [2011, "SOC"], [2012, "RES"], [2012, "SOC"], [2013, "CON"], [2014, "SOC"], [2015, "ENE"], [2015, "SOC"], [2016, "RES"], [2016, "RES"], [2018, "SOC"], [2018, "SOC"], [2019, "SOC"], [2019, "SOC"], [2020, "SOC"], [2021, "SOC"], [2022, "CON"], [2022, "SOC"]] },
  { nome: "Sorocaba", eventos: [[1965, "RES"], [2006, "SOC"], [2012, "SOC"], [2016, "RES"], [2016, "SOC"], [2025, "CON"]] },
  { nome: "São Caetano do Sul", eventos: [[2008, "SOC"], [2010, "CON"], [2011, "RES"], [2013, "RES"], [2015, "CON"], [2016, "RES"], [2019, "SOC"], [2019, "SOC"]] },
  { nome: "São José do Rio Preto", eventos: [[2004, "RES"], [2005, "RES"], [2008, "SOC"], [2010, "RES"], [2010, "SOC"], [2018, "CON"], [2018, "RES"], [2018, "SOC"], [2018, "SOC"], [2020, "SOC"], [2021, "CON"], [2021, "CON"], [2022, "SOC"], [2024, "SOC"], [2025, "SOC"]] },
  { nome: "São José dos Campos", eventos: [[1994, "SOC"], [2007, "SOC"], [2012, "SOC"], [2013, "SOC"], [2021, "SOC"], [2022, "CON"], [2022, "SOC"], [2023, "RES"], [2023, "RES"], [2025, "CON"], [2025, "RES"], [2025, "SOC"]] },
  { nome: "São Paulo", nota: "ENE:1 MOB:1", eventos: [[1993, "CON"], [1995, "MOB"], [2001, "CON"], [2002, "RES"], [2002, "RES"], [2002, "SOC"], [2004, "AGR"], [2005, "RES"], [2009, "CON"], [2009, "ENE"], [2009, "RES"], [2013, "SOC"], [2014, "CON"], [2014, "RES"], [2014, "RES"], [2014, "SOC"], [2015, "RES"], [2016, "CON"], [2018, "SOC"], [2019, "CON"], [2019, "SOC"], [2020, "SOC"], [2020, "SOC"], [2021, "AGR"], [2022, "SOC"], [2022, "SOC"], [2023, "SOC"], [2024, "SOC"], [2025, "SOC"], [2026, "SOC"]] },
]

const LAYOUTS = EVENTOS.map((m) => ({ ...m, ...layoutMunicipio(m.eventos) }))

function Sinal({ ativo }) {
  return ativo ? (
    <Check className="mx-auto h-4 w-4 text-emerald-600" strokeWidth={3} />
  ) : (
    <Minus className="mx-auto h-4 w-4 text-rose-400" strokeWidth={3} />
  )
}

export default function IndicadoresPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-slate-50 border-b border-border py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <BarChart3 className="h-4 w-4" />
                Análise normativa
              </div>
              <h1 className="mb-3 font-heading text-4xl font-bold text-foreground">Indicadores</h1>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                O <strong>Índice de Maturidade Normativa (IMN)</strong> mede o quanto cada município avançou na
                construção de um arcabouço legal de sustentabilidade, combinando a cobertura setorial das legislações
                com a profundidade relativa do seu conteúdo.
              </p>
            </div>
          </div>
        </section>

        <section className="py-10 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm md:col-span-2">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Info className="h-4 w-4 text-primary" />
                  Como o IMN é calculado
                </div>
                <p className="rounded-lg bg-slate-50 px-4 py-3 font-mono text-sm text-foreground">
                  IMN = (0,5 × Cobertura setorial) + (0,5 × Profundidade relativa MinMax)
                </p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Escala de 0 a 100%. Base de <strong>277 legislações</strong> levantadas até junho de 2026. O IMN não
                  penaliza ausências setoriais — lacunas em ENE (energia) e MOB (mobilidade) são sinalizadas
                  separadamente pelo MHN (F5).
                </p>
              </div>
              <div className="flex flex-col justify-center rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-5 text-center shadow-sm">
                <span className="text-sm font-medium text-muted-foreground">Média do corpus</span>
                <span className="mt-1 font-heading text-4xl font-bold text-primary">{fmt(MEDIA_CORPUS)}</span>
                <span className="mt-1 text-xs text-muted-foreground">277 legislações analisadas</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Índice de Maturidade Normativa (IMN) por município
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Municípios ordenados pelo IMN, do menor ao maior
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="px-4 py-3 text-left font-semibold">Município</th>
                    <th className="px-4 py-3 text-center font-semibold">IMN (%)</th>
                    <th className="px-4 py-3 text-center font-semibold">Cobertura (C)</th>
                    <th className="px-4 py-3 text-center font-semibold">Profundidade (PMinMax)</th>
                    <th className="px-4 py-3 text-center font-semibold">ENE</th>
                    <th className="px-4 py-3 text-center font-semibold">MOB</th>
                    <th className="px-4 py-3 text-left font-semibold">Perfil</th>
                  </tr>
                </thead>
                <tbody>
                  {MUNICIPIOS.map((m) => (
                    <tr key={m.nome} className="border-t border-border" style={{ backgroundColor: PERFIL_ESTILO[m.perfil] }}>
                      <td className="px-4 py-3 font-semibold text-foreground">{m.nome}</td>
                      <td className="px-4 py-3 text-center font-bold text-foreground">{fmt(m.imn)}</td>
                      <td className="px-4 py-3 text-center text-foreground">{fmt(m.cobertura)}</td>
                      <td className="px-4 py-3 text-center text-foreground">{fmt(m.profundidade)}</td>
                      <td className="px-4 py-3 text-center">
                        <Sinal ativo={m.ene} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Sinal ativo={m.mob} />
                      </td>
                      <td className="px-4 py-3 italic text-slate-700">{m.perfil}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-primary bg-slate-100">
                    <td className="px-4 py-3 font-semibold text-foreground">Média do corpus</td>
                    <td className="px-4 py-3 text-center font-bold text-foreground">{fmt(MEDIA_CORPUS)}</td>
                    <td colSpan={5} className="px-4 py-3" />
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {Object.entries(PERFIL_ESTILO).map(([perfil, cor]) => (
                <span
                  key={perfil}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-slate-700"
                >
                  <span className="h-3 w-3 rounded-full ring-1 ring-black/10" style={{ backgroundColor: cor }} />
                  {perfil}
                </span>
              ))}
            </div>

            <p className="mt-6 max-w-3xl text-xs italic leading-relaxed text-muted-foreground">
              Fonte: Levantamento Mirante da Sustentabilidade, IBICT — base junho 2026 (277 legislações). O IMN não
              penaliza ausências setoriais — lacunas em ENE e MOB são sinalizadas pelo MHN (F5). ENE
              <Check className="mx-0.5 inline h-3 w-3 text-emerald-600" strokeWidth={3} />/ MOB
              <Check className="mx-0.5 inline h-3 w-3 text-emerald-600" strokeWidth={3} /> = presença normativa no
              setor.
            </p>
          </div>
        </section>

        <section className="py-12 border-t border-border bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Evolução normativa por município e setor TSB
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Linha do tempo de política normativa — 274 legislações em 15 municípios paulistas
              </p>

              <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Info className="h-4 w-4 shrink-0 text-primary" />
                <span>
                  <strong className="text-foreground">TSB</strong> — Taxonomia Sustentável Brasileira
                </span>
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="flex min-w-[1280px] border-t border-border">
                <div className="w-40 shrink-0 pt-1">
                  {LAYOUTS.map((m) => (
                    <div
                      key={m.nome}
                      className="flex items-center justify-end border-b border-border pr-3 text-right text-xs font-medium text-foreground"
                      style={{ height: `${m.altura}px` }}
                    >
                      {m.nome}
                    </div>
                  ))}
                  <div className="h-6" />
                </div>

                <div className="relative flex-1 pt-1">
                  {MARCOS.map((marco) => (
                    <div
                      key={marco.ano}
                      className="absolute top-0 bottom-6 border-l border-dashed"
                      style={{ left: `${pct(marco.ano)}%`, borderColor: marco.cor }}
                      title={`${marco.ano} — ${marco.nome}`}
                    />
                  ))}

                  {LAYOUTS.map((m) => (
                    <div
                      key={m.nome}
                      className="relative border-b border-border"
                      style={{ height: `${m.altura}px` }}
                    >
                      {m.pontos.map((e, i) => (
                        <span
                          key={`${e.ano}-${e.setor}-${i}`}
                          className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-white"
                          style={{ left: `${pct(e.ano)}%`, top: `${e.top}px`, backgroundColor: SETORES[e.setor].cor }}
                          title={`${m.nome} • ${SETORES[e.setor].nome} (${SETORES[e.setor].completo}) • ${e.ano}`}
                        />
                      ))}
                    </div>
                  ))}

                  <div className="relative h-6">
                    {ANOS_EIXO.map((ano) => (
                      <span
                        key={ano}
                        className="absolute top-1 -translate-x-1/2 text-[10px] text-muted-foreground"
                        style={{ left: `${pct(ano)}%` }}
                      >
                        {ano}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-20 shrink-0 pt-1">
                  {LAYOUTS.map((m) => (
                    <div
                      key={m.nome}
                      className="flex items-center border-b border-border pl-2 text-[10px] font-bold text-emerald-600"
                      style={{ height: `${m.altura}px` }}
                    >
                      {m.nota || ""}
                    </div>
                  ))}
                  <div className="h-6" />
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Setor TSB</h3>
                <div className="grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-2">
                  {Object.values(SETORES).map((s) => (
                    <span key={s.nome} className="inline-flex items-center gap-2 text-xs text-foreground">
                      <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: s.cor }} />
                      <span className="font-semibold">{s.nome}</span>
                      <span className="text-muted-foreground">— {s.completo}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Marcos nacionais</h3>
                <div className="grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-2">
                  {MARCOS.map((marco) => (
                    <span key={marco.ano} className="inline-flex items-center gap-2 text-xs text-foreground">
                      <span className="h-4 w-0 border-l-2 border-dashed" style={{ borderColor: marco.cor }} />
                      {marco.ano} — {marco.nome}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-6 max-w-3xl text-xs italic leading-relaxed text-muted-foreground">
              Fonte: Levantamento Mirante da Sustentabilidade. Cada ponto representa uma legislação identificada,
              posicionada pelo ano de publicação e colorida pelo setor TSB. As anotações à direita (ex.: ENE:1, MOB:2)
              indicam a quantidade de normas nos setores de energia e mobilidade.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
