import { useState, useEffect } from "react"
import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import { Box, Button, Card, CardContent, Badge } from "@mui/material"
import { NavLink } from "react-router-dom"
import { MapPin, Calendar, ExternalLink, Leaf, Droplet, Wind, Recycle, Plus } from "lucide-react"
import { getAcoes } from "./actions"
import FilterPanel from "../../components/FilterPanel"

const iconMap = {
  "Energia Renovável": Wind,
  "Gestão de Resíduos": Recycle,
  "Recursos Hídricos": Droplet,
  "Áreas Verdes": Leaf,
  "Mobilidade Urbana": Wind,
  "Meio Ambiente": Leaf,
  "Sustentabilidade": Leaf,
  "Educação": Leaf,
  "Saúde": Leaf,
  "Tecnologia Social": Wind,
  "Desenvolvimento Social": Leaf,
  "Economia Circular": Recycle,
  "Educação Ambiental": Leaf,
  "Agricultura Sustentável": Leaf,
  "Biodiversidade": Leaf,
}

export default function AcoesPage() {
  const [actions, setActions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    nome: "",
    municipio: "",
    ods: "",
    data: ""
  })

  useEffect(() => {
    async function loadAcoes() {
      try {
        setIsLoading(true)
        const data = await getAcoes()
        setActions(data)
      } catch (error) {
        console.error('Erro ao carregar ações:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadAcoes()
  }, [])

  const handleFilter = (newFilters) => {
    setFilters(newFilters)
  }

  const handleClearFilter = (clearedFilters) => {
    setFilters(clearedFilters)
  }

  const filteredActions = actions.filter((action) => {
    // Filtro por nome
    if (filters.nome && !action.titulo?.toLowerCase().includes(filters.nome.toLowerCase())) {
      return false
    }

    // Filtro por município
    if (filters.municipio && filters.municipio !== "Todos") {
      const municipioLabel = action.municipio ? `${action.municipio.nome} - ${action.municipio.uf}` : ""
      if (municipioLabel !== filters.municipio) {
        return false
      }
    }

    // Filtro por ODS
    if (filters.ods && filters.ods !== "Todos") {
      const hasODS = action.ods?.some(ods => {
        const odsLabel = typeof ods === 'object' ? `ODS ${ods.numero} - ${ods.nome}` : ods
        return odsLabel === filters.ods
      })
      if (!hasODS) return false
    }

    // Filtro por data
    if (filters.data && action.data_inicio) {
      const actionDate = new Date(action.data_inicio).toISOString().split('T')[0]
      if (actionDate !== filters.data) {
        return false
      }
    }

    return true
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="border-b border-border bg-card py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="mb-2 font-heading text-4xl font-bold">Ações Sustentáveis</h1>
                <p className="text-muted-foreground">
                  Explore as iniciativas de sustentabilidade implementadas nos municípios paulistas
                </p>
              </div>
              <NavLink 
                to="/cadastro-acoes"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-md font-medium"
              >
                <Plus className="mr-2 h-5 w-5" />
                Cadastrar Nova Ação
              </NavLink>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <FilterPanel
            onFilter={handleFilter}
            onClearFilter={handleClearFilter}
            showDateFilter={true}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                Carregando ações...
              </div>
            ) : filteredActions.length === 0 ? (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                Nenhuma ação encontrada.
              </div>
            ) : (
              filteredActions.map((action) => {
                const temaObj = action.temas?.[0]
                const themeName = typeof temaObj === 'object' ? temaObj?.nome : temaObj || "Meio Ambiente"
                const Icon = iconMap[themeName] || Leaf
                const odsLabels = action.ods?.map(o => typeof o === 'object' ? `ODS ${o.numero} - ${o.nome}` : o) || []
                return (
                  <Card key={action.id} className="group !rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                    <div className="mb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                          <Icon className="h-6 w-6" />
                        </div>
                        <Badge className="px-3 py-1 rounded-full bg-accent text-accent-foreground">
                          {themeName}
                        </Badge>
                      </div>
                      <h3 className="mt-4 text-xl font-bold leading-tight">{action.titulo}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{action.descricao}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{action.municipio?.nome || action.nome_organizacao}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{action.data_inicio ? new Date(action.data_inicio).toLocaleDateString('pt-BR') : '-'}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {odsLabels.map((ods, index) => (
                          <Badge
                            key={index}
                            className="px-2 py-1 bg-background text-xs"
                          >
                            {ods}
                          </Badge>
                        ))}
                      </div>

                      <NavLink
                        to={`/acoes/${action.id}`}
                        className="mt-4 inline-flex w-full items-center justify-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        Ver Detalhes
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </NavLink>
                    </div>
                  </Card>
                )
              })
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
