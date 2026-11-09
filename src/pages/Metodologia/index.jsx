import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import { Layers, ArrowRight } from "lucide-react"
import { NavLink } from "react-router-dom"

const ETAPAS = [
  {
    letra: "L",
    titulo: "Levantamento",
    descricao: "Identifica e reúne normas, iniciativas e atores por município.",
    cor: "bg-primary",
  },
  {
    letra: "O",
    titulo: "Organização",
    descricao:
      "Classifica a informação por setor da Taxonomia Sustentável Brasileira (TSB), por Objetivo de Desenvolvimento Sustentável (ODS) e por tema, usando um vocabulário comum, traduzido da matriz do SDG Mapper. A TSB mantém seus setores e palavras-chave próprios, e o vocabulário dos ODS também é usado onde as classificações se sobrepõem.",
    cor: "bg-accent",
  },
  {
    letra: "C",
    titulo: "Coerência",
    descricao:
      "Avalia as relações entre normas, entre iniciativas e entre iniciativas e normas, em cinco dimensões (quadro abaixo). A dimensão externa, que relaciona o município a outras áreas de política e a bases e compromissos externos, será incorporada em fase posterior. Cada resultado registra a fonte consultada, a vigência e a data da consulta.",
    cor: "bg-primary",
  },
  {
    letra: "A",
    titulo: "Ação",
    descricao:
      "Classifica normas e iniciativas a partir dos resultados de coerência (por exemplo, alinhada, com lacuna, em tensão). O público avalia os mesmos critérios, e o Mirante mostra lado a lado a avaliação técnica e a participativa.",
    cor: "bg-accent",
  },
  {
    letra: "R",
    titulo: "Recomendações",
    descricao:
      "Com base na classificação, indica o que pode ser feito, a quem se dirige, o resultado esperado, o indicador, a data de revisão e a evidência. Acompanha os resultados, e o que se aprende volta para o próximo levantamento.",
    cor: "bg-primary",
  },
]

const DIMENSOES = [
  [
    <>
      <strong>Horizontal:</strong> entre setores, no mesmo nível de governo
    </>,
    "Normas de setores diferentes sobre o mesmo tema se reforçam ou se contradizem.",
    "Iniciativas de setores diferentes do mesmo município se reforçam ou se contradizem.",
    "Uma iniciativa de um setor e uma norma de outro setor do mesmo município.",
  ],
  [
    <>
      <strong>Vertical:</strong> entre níveis de governo, do local ao federal
    </>,
    "Uma norma municipal e as normas estaduais e federais sobre o mesmo assunto.",
    "Uma iniciativa local e uma iniciativa estadual ou federal cadastrada, quando houver.",
    "Uma iniciativa local e a norma estadual ou federal a que se refere.",
  ],
  [
    <>
      <strong>Interna:</strong> entre objetivos de uma mesma área de política, como mitigação e adaptação
    </>,
    "Normas da mesma área com objetivos que se contrariam, como mitigação e adaptação.",
    "Iniciativas da mesma área com objetivos que se contrariam.",
    "Uma iniciativa e uma norma da mesma área com objetivos compatíveis ou em tensão, como uma iniciativa de mitigação e uma norma de adaptação.",
  ],
  [
    <>
      <strong>Institucional:</strong> mecanismos de governança e coordenação que facilitam a coerência
    </>,
    "Normas que criam mecanismos de coordenação, como conselho, comitê ou fórum, e se esses mecanismos estão previstos e regulamentados.",
    "Iniciativas coordenadas por um arranjo comum, como parceria formal, rede ou consórcio.",
    "Uma iniciativa que se insere em um mecanismo de coordenação previsto em norma.",
  ],
  [
    <>
      <strong>Transmunicipal:</strong> entre territórios
    </>,
    "Normas de municípios diferentes sobre o mesmo tema, e instrumentos intermunicipais, como consórcios e comitês de bacia.",
    "Iniciativas de municípios diferentes que se duplicam, se complementam ou transferem impacto, como a reciclagem que atende o município vizinho.",
    "Uma iniciativa de um município e uma norma de outro município ou um instrumento intermunicipal que a afeta.",
  ],
]

const FUNCIONALIDADES = [
  ["F1 – Linha do tempo normativa", "Levantamento", "Estática (bases levantadas)"],
  ["F2 – Mapa de atores por setor", "Levantamento e Organização", "Dinâmica (atores cadastrados)"],
  ["F3 – Radar de maturidade normativa", "Organização", "Estática (bases levantadas)"],
  ["F4 – Mapa de coerência normativa", "Coerência", "Estática e dinâmica (normas levantadas e iniciativas cadastradas)"],
  [
    "Classificação e avaliação participativa (Iniciativas e Fórum), ligadas aos achados do F4",
    "Ação",
    "Dinâmica (iniciativas e avaliações cadastradas)",
  ],
  ["F5 – Mapa de Recomendações", "Recomendações", "Estática nas lacunas normativas; dinâmica no acompanhamento dos resultados"],
]

const INDICADORES_DIAGNOSTICO = [
  "proporção de pares de normas e iniciativas alinhados, com lacuna e em tensão, por dimensão de coerência;",
  "proporção de conselhos e outros instrumentos com condições institucionais verificadas (por exemplo, regimento e nomeação vigente);",
  "proporção de iniciativas com efeito declarado em outro município;",
  "divergência entre a avaliação técnica e a avaliação participativa, por critério.",
]

const INDICADORES_RESULTADO = [
  "lacunas resolvidas entre ciclos;",
  "normas novas ou revisadas que tratam de uma lacuna identificada;",
  "recomendações com resposta do órgão competente e com revisão feita na data prevista.",
]

const RETROALIMENTACAO = [
  ["Levantamento", "Links e relatórios de evidência viram fontes a levantar. Iniciativas voltam a ser consultadas na data de revisão."],
  ["Organização", "Os resultados são classificados por ODS e TSB, o que mostra onde há resultados e onde não há."],
  [
    "Coerência",
    "Os resultados entram como informação adicional, por exemplo um efeito declarado em outro município ou um resultado que contraria o objetivo de outra norma ou iniciativa.",
  ],
  ["Ação", "O público avalia a relevância vendo os resultados e o nível de evidência de cada um."],
  ["Recomendações", "Compara-se o resultado esperado da recomendação com o resultado declarado depois, e o status é atualizado na data de revisão."],
  ["Próximo ciclo", "Uma lacuna que diminui, uma norma nova ou uma articulação entre municípios altera o resultado da coerência quando o método é reaplicado."],
]

const MOMENTOS = [
  [
    "Antes (ex ante)",
    "Condições e precedentes: lacunas e apoios normativos, iniciativas semelhantes de outros municípios e seus resultados declarados, riscos de duplicação ou de transferência de impacto.",
    "Quanto a iniciativa vai gerar de emprego, renda ou redução de impacto ambiental.",
  ],
  [
    "Durante",
    "Acompanhamento do resultado esperado contra o declarado, com data de revisão e nível de evidência.",
    "Que a mudança observada foi causada pela iniciativa.",
  ],
  [
    "Depois (ex post)",
    "Comparação entre o esperado e o alcançado, tendência de indicadores de bases públicas antes e depois e contribuição plausível.",
    "Impacto causal, que exigiria um grupo de comparação.",
  ],
]

function Secao({ titulo, fundo, children }) {
  return (
    <section className={`border-b border-border py-14 ${fundo ? "bg-slate-50" : ""}`}>
      <div className="container mx-auto px-4">
        <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">{titulo}</h2>
        {children}
      </div>
    </section>
  )
}

function Paragrafo({ children }) {
  return <p className="mb-4 max-w-3xl text-pretty leading-relaxed text-muted-foreground last:mb-0">{children}</p>
}

function Tabela({ colunas, linhas, larguraMinima }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-border shadow-sm">
      <table className="w-full border-collapse bg-background text-sm" style={{ minWidth: larguraMinima }}>
        <thead>
          <tr className="bg-primary text-primary-foreground">
            {colunas.map((coluna) => (
              <th key={coluna} className="px-4 py-3 text-left font-semibold">
                {coluna}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, i) => (
            <tr key={i} className="border-t border-border align-top">
              {linha.map((celula, j) => (
                <td key={j} className={`px-4 py-3 leading-relaxed text-foreground ${j === 0 ? "font-medium" : ""}`}>
                  {celula}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CartaoLista({ titulo, itens }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="mb-3 text-sm font-bold text-foreground">{titulo}</h3>
      <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        {itens.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

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
                Conheça o Método LOCAR, as dimensões de coerência, as fontes de informação e os limites da análise feita
                pelo Mirante da Sustentabilidade.
              </p>
            </div>
          </div>
        </section>

        <Secao titulo="O que é o Mirante">
          <Paragrafo>
            O Mirante da Sustentabilidade organiza informações sobre sustentabilidade em municípios paulistas: leis e
            outros instrumentos normativos, iniciativas e atores locais. Seu objetivo é tornar visíveis as relações,
            lacunas e oportunidades de articulação entre eles. O Mirante não avalia o desempenho climático dos municípios
            nem indica elegibilidade a mecanismos de financiamento. Ele produz informação organizada para apoiar a
            decisão, o planejamento, o monitoramento e a cobrança.
          </Paragrafo>
        </Secao>

        <Secao titulo="O Método LOCAR" fundo>
          <Paragrafo>O Mirante segue o Método LOCAR, em cinco etapas:</Paragrafo>
          <div className="relative mt-8 max-w-3xl">
            <div className="absolute left-7 top-0 bottom-0 hidden w-0.5 bg-border sm:block" />
            <div className="space-y-6">
              {ETAPAS.map((etapa) => (
                <div key={etapa.letra} className="flex gap-5">
                  <div
                    className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${etapa.cor} text-lg font-bold text-primary-foreground shadow-md`}
                  >
                    {etapa.letra}
                  </div>
                  <div className="flex-1 rounded-xl border border-border bg-card p-5 shadow-sm">
                    <h3 className="mb-1 text-sm font-bold text-foreground">{etapa.titulo}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{etapa.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Secao>

        <Secao titulo="Dimensões de coerência">
          <Paragrafo>
            A coerência é avaliada entre pares de elementos. O quadro mostra, para cada dimensão, o que se compara em
            cada tipo de par.
          </Paragrafo>
          <Tabela
            colunas={["Dimensão", "Norma × norma", "Iniciativa × iniciativa", "Norma × iniciativa"]}
            linhas={DIMENSOES}
            larguraMinima={960}
          />
        </Secao>

        <Secao titulo="Duas fontes de informação" fundo>
          <Paragrafo>
            O Mirante funciona com duas fontes de informação, e nenhuma delas basta sozinha. As fontes cadastrais são as
            informações que atores e gestores registram na plataforma. As fontes automatizadas são as bases de dados
            levantadas e classificadas de forma automatizada. As duas têm a mesma importância: os cinco passos do LOCAR e
            as análises de coerência dependem de ambas para funcionar. Por isso as funcionalidades se dividem em
            estáticas, que trabalham com bases de dados pré-existentes levantadas, e dinâmicas, que trabalham com dados
            cadastrados.
          </Paragrafo>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h3 className="mb-2 text-sm font-bold text-foreground">Fontes automatizadas</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Instrumentos normativos.</strong> Leis, decretos e portarias de meio
                ambiente, segurança alimentar e sustentabilidade, levantados nos portais oficiais e classificados nos
                setores da TSB. Na fase piloto, são 277 instrumentos de 15 municípios.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h3 className="mb-2 text-sm font-bold text-foreground">Fontes cadastrais</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Iniciativas.</strong> Cadastradas por gestores e atores locais e
                curadas pela equipe. Cada uma é classificada por ODS, escolhido pelo cadastrante e complementado por
                classificação semântica automática, e por setor da TSB. Informam o município onde ocorrem e os municípios
                beneficiados ou afetados, o que permite avaliar a coerência entre territórios. Podem indicar a norma em
                que se apoiam. Quando não indicam, o sistema sugere candidatas, e a equipe confirma.
              </p>
            </div>
          </div>
        </Secao>

        <Secao titulo="Como as funcionalidades se ligam ao LOCAR">
          <Tabela colunas={["Funcionalidade", "Etapa", "Tipo"]} linhas={FUNCIONALIDADES} larguraMinima={720} />
          <Paragrafo>
            O F5 é um relatório de dados interativo. Reúne as recomendações de cada município, com filtros por município,
            setor da TSB e dimensão de coerência. Para cada recomendação mostra a quem se dirige, o resultado esperado, o
            indicador, o status, a data de revisão e a evidência, e permite comparar o resultado esperado com o declarado
            depois. Ele não classifica o município como habilitado ou não habilitado.
          </Paragrafo>
        </Secao>

        <Secao titulo="Participação" fundo>
          <Paragrafo>
            A participação usa os mesmos critérios da avaliação técnica. O público avalia, por exemplo, a relevância de
            cada norma ou iniciativa para o município, em escalas fechadas e com perguntas em linguagem simples. O
            Mirante mostra a avaliação técnica e a participativa separadamente, com o número de avaliadores, e não as
            funde numa nota única. A participação não substitui a decisão dos órgãos competentes: ela registra onde a
            percepção pública coincide ou diverge da análise.
          </Paragrafo>
        </Secao>

        <Secao titulo="Indicadores">
          <Paragrafo>
            Os indicadores da fase atual, como o Índice de Maturidade Normativa, são calculados sobre as normas
            classificadas. As funcionalidades de coerência usarão também dados das iniciativas cadastradas e de bases
            públicas externas.
          </Paragrafo>
          <Paragrafo>
            Um indicador de resultado mede mudança, e não entrega. Por exemplo, uma norma nova ou revisada que trata de
            uma lacuna, ou um par de normas que passa de silencioso para articulado quando o método é reaplicado. Contar
            normas mapeadas ou relatórios gerados é um indicador de produto. O Mirante registra contribuições plausíveis
            para as mudanças observadas e não afirma que causou nenhuma delas.
          </Paragrafo>
          <div className="my-6 grid gap-4 md:grid-cols-2">
            <CartaoLista
              titulo="Indicadores de diagnóstico de coerência (descrevem uma situação, não uma mudança):"
              itens={INDICADORES_DIAGNOSTICO}
            />
            <CartaoLista
              titulo="Indicadores de resultado (medem mudança entre ciclos de levantamento):"
              itens={INDICADORES_RESULTADO}
            />
          </div>
          <Paragrafo>
            Todo indicador é apresentado junto com a cobertura declarada do levantamento: o número de normas e iniciativas
            consideradas, as fontes consultadas e a data. Um número maior de lacunas pode refletir mais dados levantados e
            não indica, por si, pior desempenho do município. O Mirante não ordena municípios por esses indicadores.
          </Paragrafo>
        </Secao>

        <Secao titulo="Como os resultados retroalimentam o LOCAR" fundo>
          <Paragrafo>
            Os resultados que atores informam sobre suas iniciativas são públicos e aparecem em três níveis: declarado
            pelo ator, com evidência (há link ou relatório) e verificado pela equipe. Cada registro mostra a data. Dados
            pessoais e de financiamento não são exibidos. Esses resultados realimentam cada etapa do método:
          </Paragrafo>
          <Tabela colunas={["Etapa", "Uso dos resultados declarados"]} linhas={RETROALIMENTACAO} larguraMinima={560} />
          <Paragrafo>
            O nível de cada resultado define como ele pode ser usado. O resultado declarado aparece com aviso de que não
            foi verificado e não entra em indicadores nem em conclusões de coerência. O resultado com evidência pode
            alimentar a análise de coerência. Só o resultado verificado pela equipe pode alimentar indicadores de
            resultado. O Mirante registra contribuições plausíveis e não afirma que causou as mudanças observadas.
          </Paragrafo>
        </Secao>

        <Secao titulo="O que o Mirante analisa em cada momento do projeto">
          <Paragrafo>
            O Mirante oferece análise de contexto e acompanhamento ao longo do ciclo de uma iniciativa. Ele não estima
            impacto causal.
          </Paragrafo>
          <Tabela colunas={["Momento", "O que o Mirante oferece", "O que não afirma"]} linhas={MOMENTOS} larguraMinima={720} />
          <Paragrafo>
            Qualquer informação sobre o futuro aparece como cenário ou precedente, e nunca como previsão. No momento, o
            Mirante pode responder a perguntas do tipo “e se” sobre coerência, por exemplo quais normas e iniciativas
            ficariam articuladas se uma lacuna fosse resolvida, mas não sobre efeitos socioeconômicos ou socioambientais.
          </Paragrafo>
        </Secao>

        <Secao titulo="Cobertura e limites dos dados" fundo>
          <Paragrafo>
            O Mirante não afirma que seus dados são completos. Ele declara a cobertura: o que foi consultado e o que foi
            registrado.
          </Paragrafo>
          <Paragrafo>
            <strong className="text-foreground">Fontes automatizadas.</strong> Cada achado mostra as fontes consultadas e
            a data, o número de normas levantadas, se houve filtro prévio e o que não foi consultado. A ausência de um
            resultado não significa ausência de problema.
          </Paragrafo>
          <Paragrafo>
            <strong className="text-foreground">Fontes cadastrais.</strong> Quem cadastra se autosseleciona, e não há
            universo conhecido. Por isso os indicadores baseados em dados cadastrados são apresentados como “entre as
            iniciativas registradas”, e nunca como retrato do município. A equipe também registra iniciativas a partir de
            fontes públicas, e cada registro mostra se foi cadastrado pelo ator ou levantado pela equipe.
          </Paragrafo>
          <Paragrafo>
            Um achado de coerência só é emitido quando todos os elementos que ele compara estão na base. Quando um deles
            falta, o estado é “não avaliado”, e não “sem problema”. Cada achado tem um de três estados: avaliado, não
            avaliado (falta dado) ou sem fonte consultada. O Mirante só compara municípios quando a cobertura é
            comparável.
          </Paragrafo>
        </Secao>

        <section className="py-14">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">Fontes de dados</h2>
                <Paragrafo>
                  O Mirante combina normas municipais, iniciativas cadastradas e bases públicas oficiais e estatísticas.
                  O conjunto de bases está em definição e será ampliado conforme as funcionalidades de avaliação forem
                  incorporadas.
                </Paragrafo>
              </div>
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">Cobertura</h2>
                <Paragrafo>
                  A fase piloto reúne 15 municípios do estado de São Paulo. O objetivo é ampliar gradualmente a cobertura.
                </Paragrafo>
              </div>
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
