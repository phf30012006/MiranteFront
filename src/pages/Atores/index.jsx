import { useState } from "react"
import { Dialog, DialogContent } from "@mui/material"
import { CircleCheck, ExternalLink, X } from "lucide-react"
import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import Pagination from "../../components/Pagination"
import atores from "./atores.json"
import acoesSemCnpj from "./acoes-sem-cnpj.json"

const ITENS_POR_PAGINA = 20

const odsColors = {
  1: "#E5243B",
  2: "#DDA63A",
  3: "#4C9F38",
  4: "#C5192D",
  5: "#FF3A21",
  6: "#26BDE2",
  7: "#FCC30B",
  8: "#A21942",
  9: "#FD6925",
  10: "#DD1367",
  11: "#FD9D24",
  12: "#BF8B2E",
  13: "#3F7E44",
  14: "#0A97D9",
  15: "#56C02B",
  16: "#00689D",
  17: "#19486A",
}

const STATUS_SEM_SITE = "CNPJ ativo; site/redes não localizados"
const STATUS_SITE_PROPRIO = "CNPJ ativo; site/link localizado em busca na web (conferir)"

const GRUPOS_STATUS = [
  { label: "Sem site/redes localizados", cor: "#9CA3AF", status: [STATUS_SEM_SITE] },
  {
    label: "Outro (buscado, não confirmado)",
    cor: "#C9A93C",
    status: [
      "CNPJ ativo; buscado na web (06/11/2026), sem site/redes localizados",
      "CNPJ ativo; site localizado (conferir)",
      "CNPJ ativo; site declarado no Mapa OSC (conferir)",
    ],
  },
  { label: "Site próprio localizado", cor: "#4CAF50", status: [STATUS_SITE_PROPRIO] },
  { label: "Só rede social localizada", cor: "#3B82F6", status: ["CNPJ ativo; só rede social localizada (conferir)"] },
  { label: "Site da organização-mãe", cor: "#D32F2F", status: ["CNPJ ativo; site da organização-mãe ou relacionada (conferir)"] },
]

const ORDENACOES = {
  acoes: (a, b) => b.acoes.length - a.acoes.length,
  nome: (a, b) => a.nome.localeCompare(b.nome, "pt-BR"),
}

const atoresComAcao = atores.filter((a) => a.acoes.length > 0)

const contarStatus = (lista) => atores.filter((a) => lista.includes(a.status)).length

const contar = (valores) => {
  const contagem = new Map()
  valores.forEach((v) => contagem.set(v, (contagem.get(v) || 0) + 1))
  return [...contagem].sort((a, b) => b[1] - a[1])
}

const POR_TIPO = contar(atores.map((a) => a.tipo))
const POR_STATUS = GRUPOS_STATUS.map((g) => ({ ...g, valor: contarStatus(g.status) }))
const POR_ODS = contar(atores.flatMap((a) => a.ods)).slice(0, 6)

const percentual = (valor) =>
  `${((valor / atores.length) * 100).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`

const semAcentos = (texto) =>
  texto
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()

const INDICADORES = [
  { titulo: "Total de atores", valor: atores.length, nota: "Lista OSC compilada via Receita Federal + Mapa das OSCs (IPEA)" },
  {
    titulo: "Com ação verificada",
    valor: atoresComAcao.length,
    nota: "Cruzamento por CNPJ com fontes concretas",
    destaque: true,
  },
  {
    titulo: "Site próprio localizado",
    valor: contarStatus([STATUS_SITE_PROPRIO]),
    nota: `${percentual(contarStatus([STATUS_SITE_PROPRIO]))} do total`,
  },
  {
    titulo: "Sem site ou redes",
    valor: contarStatus([STATUS_SEM_SITE]),
    nota: `${percentual(contarStatus([STATUS_SEM_SITE]))} do total`,
  },
]

function Barra({ valor, max, cor, titulo }) {
  return (
    <div className="h-1.5 flex-1 rounded-full bg-slate-100" title={titulo}>
      <div
        className="h-full rounded-full"
        style={{ width: `${(valor / max) * 100}%`, minWidth: "3px", backgroundColor: cor }}
      />
    </div>
  )
}

function CartaoGrafico({ titulo, children }) {
  return (
    <div className="rounded-xl border border-border bg-background p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-bold text-foreground">{titulo}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Valor({ children }) {
  return <span className="w-8 shrink-0 text-right text-xs font-semibold tabular-nums text-foreground">{children}</span>
}

function OdsBadges({ ods }) {
  if (ods.length === 0) return <span className="text-muted-foreground">—</span>
  return (
    <div className="flex flex-wrap gap-1">
      {ods.map((numero) => (
        <span
          key={numero}
          title={`ODS ${numero}`}
          className="inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold text-white"
          style={{ backgroundColor: odsColors[numero] }}
        >
          {numero}
        </span>
      ))}
    </div>
  )
}

function LinkFonte({ fonte }) {
  if (!fonte.startsWith("http")) return <span className="text-xs text-muted-foreground">{fonte}</span>
  return (
    <a
      href={fonte}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
    >
      Ver fonte
      <ExternalLink className="h-3 w-3" />
    </a>
  )
}

function ItemDetalhe({ rotulo, children }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{rotulo}</dt>
      <dd className="mt-0.5 text-sm text-foreground">{children}</dd>
    </div>
  )
}

function DetalheAtor({ ator, onClose }) {
  return (
    <Dialog open={Boolean(ator)} onClose={onClose} maxWidth="sm" fullWidth aria-labelledby="detalhe-ator-titulo">
      {ator && (
        <DialogContent>
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 id="detalhe-ator-titulo" className="text-lg font-bold leading-snug text-foreground">
              {ator.nome}
            </h2>
            <button type="button" onClick={onClose} aria-label="Fechar" className="shrink-0 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>

          <dl className="grid gap-3 sm:grid-cols-2">
            <ItemDetalhe rotulo="CNPJ">{ator.cnpj}</ItemDetalhe>
            <ItemDetalhe rotulo="Tipo">{ator.tipo}</ItemDetalhe>
            <ItemDetalhe rotulo="Área">{ator.area}</ItemDetalhe>
            <ItemDetalhe rotulo="Abrangência">{ator.abrangencia}</ItemDetalhe>
            <ItemDetalhe rotulo="ODS (proposta, a validar)">
              <OdsBadges ods={ator.ods} />
            </ItemDetalhe>
            <ItemDetalhe rotulo="Site">
              {ator.site ? (
                <a href={ator.site} target="_blank" rel="noopener noreferrer" className="break-all text-primary hover:underline">
                  {ator.site}
                </a>
              ) : (
                "Não localizado"
              )}
            </ItemDetalhe>
          </dl>

          <h3 className="mb-3 mt-6 text-sm font-bold text-foreground">Ações verificadas ({ator.acoes.length})</h3>
          {ator.acoes.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhuma ação concreta verificada até o momento.</p>
          ) : (
            <ul className="space-y-3">
              {ator.acoes.map((acao) => (
                <li key={acao.fonte + acao.descricao} className="rounded-lg border border-border p-3">
                  <p className="text-sm leading-relaxed text-foreground">{acao.descricao}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {acao.data} · {acao.tipoFonte}
                  </p>
                  <div className="mt-1">
                    <LinkFonte fonte={acao.fonte} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </DialogContent>
      )}
    </Dialog>
  )
}

export default function AtoresPage() {
  const [busca, setBusca] = useState("")
  const [ordenacao, setOrdenacao] = useState("acoes")
  const [verTodos, setVerTodos] = useState(false)
  const [pagina, setPagina] = useState(1)
  const [atorSelecionado, setAtorSelecionado] = useState(null)

  const termo = semAcentos(busca.trim())
  const atoresFiltrados = (verTodos ? atores : atoresComAcao)
    .filter((a) => semAcentos(`${a.nome} ${a.area} ${a.cnpj}`).includes(termo))
    .sort(ORDENACOES[ordenacao])

  const totalPaginas = Math.ceil(atoresFiltrados.length / ITENS_POR_PAGINA)
  const inicio = (pagina - 1) * ITENS_POR_PAGINA
  const atoresDaPagina = atoresFiltrados.slice(inicio, inicio + ITENS_POR_PAGINA)

  const alternarVisao = () => {
    setVerTodos(!verTodos)
    setPagina(1)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-slate-50 py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="mb-2 font-heading text-4xl font-bold text-foreground">Painel de Atores</h1>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                Visão agregada das {atores.length} organizações da sociedade civil mapeadas em Marília (SP), com
                cruzamento de ações concretas por CNPJ.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto space-y-6 px-4 py-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INDICADORES.map((indicador) => (
              <div key={indicador.titulo} className="rounded-xl border border-border bg-background p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{indicador.titulo}</p>
                <p className={`mt-1 font-heading text-3xl font-bold ${indicador.destaque ? "text-accent" : "text-foreground"}`}>
                  {indicador.valor}
                </p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">{indicador.nota}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <CartaoGrafico titulo="Atores por tipo">
              {POR_TIPO.map(([tipo, valor]) => (
                <div key={tipo} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 text-xs leading-tight text-foreground">{tipo}</span>
                  <Barra valor={valor} max={POR_TIPO[0][1]} cor="#D32F2F" titulo={`${tipo}: ${valor} (${percentual(valor)})`} />
                  <Valor>{valor}</Valor>
                </div>
              ))}
            </CartaoGrafico>

            <CartaoGrafico titulo="Status do cadastro (site/redes)">
              {POR_STATUS.map(({ label, cor, valor }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="flex w-32 shrink-0 items-center gap-2 text-xs leading-tight text-foreground">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: cor }} />
                    {label}
                  </span>
                  <Barra
                    valor={valor}
                    max={Math.max(...POR_STATUS.map((s) => s.valor))}
                    cor={cor}
                    titulo={`${label}: ${valor} (${percentual(valor)})`}
                  />
                  <Valor>{valor}</Valor>
                </div>
              ))}
            </CartaoGrafico>

            <CartaoGrafico titulo="ODS mais frequentes">
              {POR_ODS.map(([numero, valor]) => (
                <div key={numero} className="flex items-center gap-3">
                  <span className="w-28 shrink-0">
                    <span
                      className="inline-block rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
                      style={{ backgroundColor: odsColors[numero] }}
                    >
                      ODS {numero}
                    </span>
                  </span>
                  <Barra valor={valor} max={POR_ODS[0][1]} cor="#4CAF50" titulo={`ODS ${numero}: ${valor} atores`} />
                  <Valor>{valor}</Valor>
                </div>
              ))}
            </CartaoGrafico>
          </div>

          <div className="rounded-xl border border-border bg-background shadow-sm">
            <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-base font-bold text-foreground">
                {verTodos ? "Todos os atores" : "Atores com ação concreta verificada"}
              </h2>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="search"
                  value={busca}
                  onChange={(e) => {
                    setBusca(e.target.value)
                    setPagina(1)
                  }}
                  placeholder="Buscar..."
                  aria-label="Buscar atores"
                  className="rounded-md border border-border px-3 py-1.5 text-sm"
                />
                <select
                  value={ordenacao}
                  onChange={(e) => {
                    setOrdenacao(e.target.value)
                    setPagina(1)
                  }}
                  aria-label="Ordenar atores"
                  className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
                >
                  <option value="acoes">Ordenar: mais ações</option>
                  <option value="nome">Ordenar: nome (A–Z)</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-border text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-3 font-semibold">Ator</th>
                    <th className="px-4 py-3 font-semibold">Área</th>
                    <th className="px-4 py-3 font-semibold">Ações verificadas</th>
                    <th className="px-4 py-3 font-semibold">ODS</th>
                    <th className="px-4 py-3" aria-label="Detalhes" />
                  </tr>
                </thead>
                <tbody>
                  {atoresDaPagina.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                        Nenhum ator encontrado.
                      </td>
                    </tr>
                  ) : (
                    atoresDaPagina.map((ator) => (
                      <tr key={ator.id} className="border-t border-border">
                        <td className="px-4 py-3 font-semibold text-foreground">{ator.nome}</td>
                        <td className="px-4 py-3 text-foreground">{ator.area}</td>
                        <td className="px-4 py-3">
                          {ator.acoes.length > 0 ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
                              <CircleCheck className="h-3 w-3" aria-hidden="true" />
                              {ator.acoes.length}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <OdsBadges ods={ator.ods} />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => setAtorSelecionado(ator)}
                            aria-label={`Ver detalhes de ${ator.nome}`}
                            className="rounded-md border border-border px-3 py-1 text-xs font-medium hover:bg-slate-50"
                          >
                            Ver
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="border-t border-border p-4">
              <button type="button" onClick={alternarVisao} className="text-sm font-medium text-primary hover:underline">
                {verTodos
                  ? "← Voltar aos atores com ação verificada"
                  : `Ver todos os ${atores.length} atores na tabela completa →`}
              </button>
              <Pagination currentPage={pagina} totalPages={totalPaginas} onPageChange={setPagina} />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background shadow-sm">
            <div className="border-b border-border p-4">
              <h2 className="text-base font-bold text-foreground">Ações sem CNPJ vinculado</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {acoesSemCnpj.length} ações localizadas cuja entidade não foi cruzada por CNPJ com a lista de organizações.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-border text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <th className="w-56 px-4 py-3 font-semibold">Entidade</th>
                    <th className="w-40 px-4 py-3 font-semibold">Área</th>
                    <th className="px-4 py-3 font-semibold">Ação</th>
                    <th className="w-40 px-4 py-3 font-semibold">Data</th>
                    <th className="w-40 px-4 py-3 font-semibold">Fonte</th>
                  </tr>
                </thead>
                <tbody>
                  {acoesSemCnpj.map((acao) => (
                    <tr key={acao.descricao} className="border-t border-border align-top">
                      <td className="px-4 py-3 font-semibold text-foreground">{acao.entidade}</td>
                      <td className="px-4 py-3 text-foreground">{acao.area}</td>
                      <td className="px-4 py-3 leading-relaxed text-foreground">{acao.descricao}</td>
                      <td className="px-4 py-3 text-foreground">{acao.data}</td>
                      <td className="px-4 py-3">
                        <p className="mb-1 text-xs text-muted-foreground">{acao.tipoFonte}</p>
                        <LinkFonte fonte={acao.fonte} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <DetalheAtor ator={atorSelecionado} onClose={() => setAtorSelecionado(null)} />

      <Footer />
    </div>
  )
}
