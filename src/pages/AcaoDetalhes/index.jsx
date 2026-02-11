import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import {
  ArrowLeft,
  Building2,
  Calendar,
  DollarSign,
  Users,
  Target,
  Award,
  ExternalLink,
  FileText,
  Lightbulb,
  Network,
  Database,
  MapPin,
  Mail,
  Phone,
  Globe,
} from "lucide-react"
import { Card, CardContent, Box, Button, Badge, Tabs, Tab, Divider, Typography } from "@mui/material"
import { getAcaoById } from "./actions"
import CustomTabs from "../../components/cutomTab"

export default function AcaoDetalhesPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState("geral")
  const [acao, setAcao] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadAcao() {
      try {
        setIsLoading(true)
        const data = await getAcaoById(id)
        setAcao(data)
      } catch (error) {
        console.error('Erro ao carregar ação:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadAcao()
  }, [id])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Typography color="text.secondary">Carregando...</Typography>
        </main>
        <Footer />
      </div>
    )
  }

  if (!acao) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Typography color="text.secondary">Ação não encontrada.</Typography>
        </main>
        <Footer />
      </div>
    )
  }

  const temas = acao.temas?.map(t => typeof t === 'object' ? t.nome : t) || []
  const odsLabels = acao.ods?.map(o => typeof o === 'object' ? { numero: o.numero, nome: o.nome } : { numero: o, nome: '' }) || []
  const municipioNome = typeof acao.municipio === 'object' ? acao.municipio?.nome : acao.municipio || ''

  const getOdsColor = (numero) => {
    const colors = {
      1: '#E5243B',
      2: '#DDA63A',
      3: '#4C9F38',
      4: '#C5192D',
      5: '#FF3A21',
      6: '#26BDE2',
      7: '#FCC30B',
      8: '#A21942',
      9: '#FD6925',
      10: '#DD1367',
      11: '#FD9D24',
      12: '#BF8B2E',
      13: '#3F7E44',
      14: '#0A97D9',
      15: '#56C02B',
      16: '#00689D',
      17: '#19486A',
    }
    return colors[numero] || '#4CAF50'
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "action.hover" }}>
          <Box sx={{ maxWidth: "1400px", mx: "auto", px: 0, py: 2 }}>
            <Button
              startIcon={<ArrowLeft size={16} />}
              onClick={() => navigate("/acoes")}
              sx={{ mb: 1, px: 1.5, py: 0.5, textTransform: "none", color: "text.secondary", fontFamily: 'Inter, sans-serif', "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }}
            >
              Voltar para Ações
            </Button>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 4, flexWrap: "wrap" }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 1, fontFamily: 'Inter, sans-serif' }}>
                  {acao.titulo}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2, color: "text.secondary" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Building2 size={16} />
                    <Typography variant="body2" sx={{ fontFamily: 'Inter, sans-serif' }}>
                      {acao.nome_organizacao} ({acao.sigla_organizacao})
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <MapPin size={16} />
                    <Typography variant="body2" sx={{ fontFamily: 'Inter, sans-serif' }}>{municipioNome}</Typography>
                  </Box>
                  <Badge
                    className={`px-2 py-0.5 text-xs rounded-full ${acao.status === 1 ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}
                  >
                    {acao.status === 1 ? "Desenvolvido" : "Em Andamento"}
                  </Badge>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="outlined" size="small" startIcon={<FileText size={16} />} sx={{ borderColor: "#B70002", color: "#B70002", "&:hover": { borderColor: "#990002", backgroundColor: "rgba(183, 0, 2, 0.04)" }, fontFamily: 'Inter, sans-serif' }}>
                  Relatório
                </Button>
                <Button variant="contained" size="small" startIcon={<ExternalLink size={16} />} sx={{ backgroundColor: "#B70002", "&:hover": { backgroundColor: "#990002" }, fontFamily: 'Inter, sans-serif' }} >
                  Site da Ação
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "action.hover" }}>
          <Box sx={{ maxWidth: "1400px", mx: "auto", px: 0, py: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              <Typography variant="body2" fontWeight={500} color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>
                ODS:
              </Typography>
              {odsLabels.map((ods, index) => (
                <Badge
                  key={index}
                  className="px-3 py-1 rounded-full text-white"
                  sx={{ fontFamily: 'Inter, sans-serif', backgroundColor: getOdsColor(ods.numero) }}
                >
                  ODS {ods.numero}{ods.nome ? ` - ${ods.nome}` : ''}
                </Badge>
              ))}
            </Box>
          </Box>
        </Box>

        <Box sx={{ maxWidth: "1400px", mx: "auto", px: 1, py: 6 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 380px" }, gap: 6 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box>
                <CustomTabs 
                  value={activeTab} 
                  onChange={(e, newValue) => setActiveTab(newValue)}
                >
                </CustomTabs>

                {activeTab === "geral" && (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
                    <Card sx={{ bgcolor: "action.hover" }}>
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, fontFamily: 'Inter, sans-serif' }}>
                          Descrição da Ação
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.descricao}</Typography>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3 }}>
                          <Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                              <Calendar size={16} color="#dc2626" />
                              <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'Inter, sans-serif' }}>Data de Início</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 3, fontFamily: 'Inter, sans-serif' }}>
                              {new Date(acao.data_inicio).toLocaleDateString("pt-BR")}
                            </Typography>
                          </Box>
                          {acao.status === 1 && (
                          <Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                              <Calendar size={16} color="#dc2626" />
                              <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'Inter, sans-serif' }}>Data de Término</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 3 }}>
                              {new Date(acao.data_fim).toLocaleDateString("pt-BR")}
                            </Typography>
                          </Box>
                          )}
                          <Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                              <Users size={16} color="#dc2626" />
                              <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'Inter, sans-serif' }}>Colaboradores</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 3, fontFamily: 'Inter, sans-serif' }}>
                              {acao.numero_colaboradores} pessoas
                            </Typography>
                          </Box>
                          <Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                              <DollarSign size={16} color="#dc2626" />
                              <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'Inter, sans-serif' }}>Financiamento</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 3 }}>
                              {acao.valor_financiamento}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>

                    <Card sx={{ bgcolor: "action.hover" }}>
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                          <Target size={20} color="#dc2626" />
                          <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'Inter, sans-serif' }}>Objetivos</Typography>
                        </Box>
                        <Typography color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.objetivos}</Typography>
                      </CardContent>
                    </Card>

                    <Card sx={{ bgcolor: "action.hover" }}>
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                          <Users size={20} color="#dc2626" />
                          <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'Inter, sans-serif' }}>Público-Alvo</Typography>
                        </Box>
                        <Typography color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.publico_alvo}</Typography>
                      </CardContent>
                    </Card>

                    <Card sx={{ bgcolor: "action.hover" }}>
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, fontFamily: 'Inter, sans-serif' }}>
                          Financiador
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.financiador}</Typography>
                      </CardContent>
                    </Card>
                  </Box>
                )}

                {activeTab === "organizacao" && (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
                    <Card sx={{ bgcolor: "action.hover" }}>
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, fontFamily: 'Inter, sans-serif' }}>
                          Informações da Organização
                        </Typography>
                        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3 }}>
                          <Box>
                            <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5, fontFamily: 'Inter, sans-serif' }}>Nome Completo</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.nome_organizacao}</Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5, fontFamily: 'Inter, sans-serif' }}>Sigla</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.sigla_organizacao}</Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5, fontFamily: 'Inter, sans-serif' }}>Documento (CNPJ)</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.documento_ator}</Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5, fontFamily: 'Inter, sans-serif' }}>Tipo de Ator</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.tipo_ator}</Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5, fontFamily: 'Inter, sans-serif' }}>Ano de Fundação</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.ano_fundacao}</Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5, fontFamily: 'Inter, sans-serif' }}>Abrangência</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.abrangencia_geografica}</Typography>
                          </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                            <MapPin size={16} color="#dc2626" style={{ marginTop: 4 }} />
                            <Box>
                              <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'Inter, sans-serif' }}>Endereço</Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.endereco_completo}</Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>Região: {acao.regiao_administrativa}</Typography>
                            </Box>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Globe size={16} color="#dc2626" />
                            <a href={acao.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.875rem", color: "#dc2626", textDecoration: "none", fontFamily: 'Inter, sans-serif' }}>
                              {acao.website}
                            </a>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Mail size={16} color="#dc2626" />
                            <a href={`mailto:${acao.email_contato}`} style={{ fontSize: "0.875rem", color: "#dc2626", textDecoration: "none", fontFamily: 'Inter, sans-serif' }}>
                              {acao.email_contato}
                            </a>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Phone size={16} color="#dc2626" />
                            <Typography variant="body2" color="text.secondary">{acao.telefone_contato}</Typography>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Network size={16} color="#dc2626" />
                            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.redes_sociais}</Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                )}

                {activeTab === "resultados" && (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
                    <Card sx={{ bgcolor: "action.hover" }}>
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, fontFamily: 'Inter, sans-serif' }}>
                          Resultados Esperados
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.resultados_esperados}</Typography>
                      </CardContent>
                    </Card>

                    <Card sx={{ bgcolor: "action.hover" }}>
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold" color="success.main" sx={{ mb: 2, fontFamily: 'Inter, sans-serif' }}>
                          Resultados Alcançados
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.resultados_alcancados}</Typography>
                      </CardContent>
                    </Card>

                    <Card sx={{ bgcolor: "action.hover" }}>
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                          <Lightbulb size={20} color="#dc2626" />
                          <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'Inter, sans-serif' }}>Aprendizados e Inovações</Typography>
                        </Box>
                        <Typography color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.aprendizados_inovacoes}</Typography>
                      </CardContent>
                    </Card>

                    <Card sx={{ bgcolor: "action.hover" }}>
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, fontFamily: 'Inter, sans-serif' }}>
                          Indicadores de Impacto
                        </Typography>
                        <Typography color="text.secondary" sx={{ whiteSpace: "pre-line", fontFamily: 'Inter, sans-serif' }}>
                          {acao.indicadores_impacto}
                        </Typography>
                      </CardContent>
                    </Card>

                    <Card sx={{ bgcolor: "action.hover" }}>
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                          <Award size={20} color="#dc2626" />
                          <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'Inter, sans-serif' }}>Prêmios e Reconhecimentos</Typography>
                        </Box>
                        <Typography color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.premios_recebidos}</Typography>
                      </CardContent>
                    </Card>
                  </Box>
                )}

                {activeTab === "parcerias" && (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
                    <Card sx={{ bgcolor: "action.hover" }}>
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                          <Network size={20} color="#dc2626" />
                          <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'Inter, sans-serif' }}>Parcerias Envolvidas</Typography>
                        </Box>
                        <Typography color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.parcerias_envolvidas}</Typography>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3 }}>
                          <Box>
                            <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5, fontFamily: 'Inter, sans-serif' }}>Tipo de Parceria</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.tipo_parceria}</Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5, fontFamily: 'Inter, sans-serif' }}>Período</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.periodo_parceria}</Typography>
                          </Box>
                          <Box sx={{ gridColumn: { sm: "1 / -1" } }}>
                            <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5, fontFamily: 'Inter, sans-serif' }}>Áreas de Cooperação</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.area_cooperacao}</Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>

                    <Card sx={{ bgcolor: "action.hover" }}>
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, fontFamily: 'Inter, sans-serif' }}>
                          Vínculo com Políticas Públicas
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <Box>
                            <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5, fontFamily: 'Inter, sans-serif' }}>Possui Vínculo?</Typography>
                            <Badge
                              className={`px-3 py-1 rounded-full ${acao.possui_vinculo ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}
                            >
                              {acao.possui_vinculo ? "Sim" : "Não"}
                            </Badge>
                          </Box>
                          {acao.possui_vinculo && (
                            <Box>
                              <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5, fontFamily: 'Inter, sans-serif' }}>Política Pública</Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.vinculo_politica_publica}</Typography>
                            </Box>
                          )}

                          <Divider />

                          <Box>
                            <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5, fontFamily: 'Inter, sans-serif' }}>Participa de Conselhos?</Typography>
                            <Badge
                              className={`px-3 py-1 rounded-full ${acao.participa_conselhos ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}
                            >
                              {acao.participa_conselhos ? "Sim" : "Não"}
                            </Badge>
                          </Box>
                          {acao.participa_conselhos && (
                            <Box>
                              <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5, fontFamily: 'Inter, sans-serif' }}>Conselhos</Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.participacao_conselhos}</Typography>
                            </Box>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                )}

                {activeTab === "complementos" && (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
                    <Card sx={{ bgcolor: "action.hover" }}>
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, fontFamily: 'Inter, sans-serif' }}>
                          Tecnologias Utilizadas
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.tecnologias_utilizadas}</Typography>
                      </CardContent>
                    </Card>

                    <Card sx={{ bgcolor: "action.hover" }}>
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                          <Database size={20} color="#dc2626" />
                          <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'Inter, sans-serif' }}>Uso de Dados Abertos</Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <Box>
                            <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5, fontFamily: 'Inter, sans-serif' }}>Utiliza Dados Abertos?</Typography>
                            <Badge
                              className={`px-3 py-1 rounded-full ${acao.usa_dados_abertos ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}
                            >
                              {acao.usa_dados_abertos ? "Sim" : "Não"}
                            </Badge>
                          </Box>

                          {acao.usa_dados_abertos && (
                            <>
                              <Box>
                                <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5, fontFamily: 'Inter, sans-serif' }}>Exemplo de Uso</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.exemplo_uso_dados}</Typography>
                              </Box>

                              <Box>
                                <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5, fontFamily: 'Inter, sans-serif' }}>Links para Relatórios</Typography>
                                <a
                                  href={acao.links_relatorios}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ fontSize: "0.875rem", color: "#dc2626", textDecoration: "none", display: "flex", alignItems: "center", gap: 4, fontFamily: 'Inter, sans-serif' }}
                                >
                                  {acao.links_relatorios}
                                  <ExternalLink size={12} />
                                </a>
                              </Box>
                            </>
                          )}
                        </Box>
                      </CardContent>
                    </Card>

                    {acao.observacoes && (
                      <Card sx={{ bgcolor: "action.hover" }}>
                        <CardContent>
                          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, fontFamily: 'Inter, sans-serif' }}>
                            Observações
                          </Typography>
                          <Typography color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.observacoes}</Typography>
                        </CardContent>
                      </Card>
                    )}
                  </Box>
                )}
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Card sx={{ bgcolor: "action.hover" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, fontFamily: 'Inter, sans-serif' }}>
                    Resumo
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box>
                      <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5, fontFamily: 'Inter, sans-serif' }}>Município</Typography>
                      <Badge className="px-3 py-1 rounded-full bg-primary text-primary-foreground">
                        {municipioNome}
                      </Badge>
                    </Box>

                    <Divider />

                    <Box>
                      <Typography variant="body2" fontWeight={500} sx={{ mb: 1, fontFamily: 'Inter, sans-serif' }}>Temas</Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {temas.map((tema, idx) => (
                          <Badge key={idx} className="px-2 py-1 bg-background text-xs rounded-full border border-border">
                            {tema}
                          </Badge>
                        ))}
                      </Box>
                    </Box>

                    <Divider />

                    <Box>
                      <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5, fontFamily: 'Inter, sans-serif' }}>Status</Typography>
                      <Badge
                        className={`px-2 py-0.5 text-xs rounded-full ${acao.status === 1 ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}
                      >
                        {acao.status === 1 ? "Ação Desenvolvida" : "Ação Em Andamento"}
                      </Badge>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ bgcolor: "action.hover" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, fontFamily: 'Inter, sans-serif' }}>
                    Contato
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Mail size={16} color="#525252" />
                      <a href={`mailto:${acao.email_contato}`} style={{ fontSize: "0.875rem", color: "#dc2626", textDecoration: "none", fontFamily: 'Inter, sans-serif' }}>
                        {acao.email_contato}
                      </a>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Phone size={16} color="#525252" />
                      <Typography variant="body2" sx={{ fontFamily: 'Inter, sans-serif' }}>{acao.telefone_contato}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Globe size={16} color="#525252" />
                      <a href={acao.website} target="blank" rel="noopener noreferrer" style={{ fontSize: "0.875rem", color: "#dc2626", textDecoration: "none", fontFamily: 'Inter, sans-serif' }}>
                        Website
                      </a>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Button variant="contained" fullWidth size="large" sx={{ backgroundColor: "#B70002", "&:hover": { backgroundColor: "#990002" } }}>
                Solicitar Parceria
              </Button>
            </Box>
          </Box>
        </Box>
      </main>

      <Footer />
    </div>
  )
}
