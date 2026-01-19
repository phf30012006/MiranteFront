import { useState, useEffect } from "react"
import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import { 
  Box, Button, Card, CardContent, TextField, 
  FormControl, InputLabel, Select, MenuItem, 
  FormControlLabel, Checkbox, Typography,
  Radio, RadioGroup, FormLabel, Divider,
  Modal, Dialog, DialogTitle, DialogContent,
  DialogActions, OutlinedInput, Chip,
  Snackbar, Alert
} from "@mui/material"
import { Save, Cancel, Add } from "@mui/icons-material"
import { cadastrarAcao, cadastrarTema, getMunicipios, getOds, getTemas } from "./actions";


const tipoAtorOptions = [
  "ONG/OSC",
  "Empresa Privada",
  "Instituição de Ensino",
  "Governo Municipal",
  "Governo Estadual",
  "Governo Federal",
  "Cooperativa",
  "Associação",
  "Fundação",
  "Pessoa Física",
  "Outro"
]

const abrangenciaOptions = [
  "Municipal",
  "Regional",
  "Estadual", 
  "Nacional",
  "Internacional"
]

const tiposParceria = [
  "Técnica",
  "Financeira",
  "Institucional",
  "Operacional",
  "Acadêmica"
]

export default function CadastroAcoesPage() {
  const [projectStatus, setProjectStatus] = useState('em-andamento')
  const [selectedODS, setSelectedODS] = useState([])
  const [selectedTemas, setSelectedTemas] = useState([])
  const [allTemas, setAllTemas] = useState([])
  const [allOds, setAllOds] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTema, setNewTema] = useState({ nome: '', descricao: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [municipios, setMunicipios] = useState([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity })
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return
    setSnackbar(prev => ({ ...prev, open: false }))
  }

  useEffect(() => {
    async function loadData() {
      try {
        const [municipiosData, odsData, temasData] = await Promise.all([
          getMunicipios(),
          getOds(),
          getTemas()
        ])
        setMunicipios(municipiosData)
        setAllOds(odsData)
        setAllTemas(temasData)
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    }
    loadData()
  }, [])

  const [formData, setFormData] = useState({
    nome_organizacao: '',
    sigla_organizacao: '',
    documento_ator: '',
    tipo_ator: '',
    ano_fundacao: '',
    endereco_completo: '',
    regiao_administrativa: '',
    website: '',
    email_contato: '',
    telefone_contato: '',
    redes_sociais: '',
    abrangencia_geografica: '',
    municipio_id: '',
    titulo: '',
    data_inicio: '',
    data_fim: '',
    descricao: '',
    publico_alvo: '',
    numero_colaboradores: '',
    financiador: '',
    valor_financiamento: '',
    objetivos: '',
    resultados_esperados: '',
    resultados_alcancados: '',
    aprendizados_inovacoes: '',
    parcerias_envolvidas: '',
    tipo_parceria: '',
    periodo_parceria: '',
    area_cooperacao: '',
    possui_vinculo: false,
    vinculo_politica_publica: '',
    participa_conselhos: false,
    participacao_conselhos: '',
    usa_dados_abertos: false,
    links_relatorios: '',
    exemplo_uso_dados: '',
    tecnologias_utilizadas: '',
    indicadores_impacto: '',
    premios_recebidos: '',
    observacoes: '',
  })

  const handleInputChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const inputStyles = {
    borderRadius: 1.25,
    fontFamily: 'Inter, sans-serif',
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#d1d5db",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--primary)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--primary)",
    },
  }

  const handleODSChange = (odsId) => {
    setSelectedODS(prev => 
      prev.includes(odsId) 
        ? prev.filter(item => item !== odsId)
        : [...prev, odsId]
    )
  }

  const handleTemaChange = (event) => {
    const value = event.target.value
    setSelectedTemas(typeof value === 'string' ? value.split(',').map(Number) : value)
  }

  const handleAddNewTema = async () => {
    if (newTema.nome.trim()) {
      try {
        const response = await cadastrarTema(newTema)
        const temasData = await getTemas()
        setAllTemas(temasData)
        if (response.id) {
          setSelectedTemas(prev => [...prev, response.id])
        }
        setNewTema({ nome: '', descricao: '' })
        setIsModalOpen(false)
        showSnackbar('Tema cadastrado com sucesso!', 'success')
      } catch (error) {
        console.error('Erro ao cadastrar tema:', error)
        showSnackbar('Erro ao cadastrar tema. Tente novamente.', 'error')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const payload = {
        ...formData,
        status: projectStatus === 'em-andamento' ? 0 : 1,
        ano_fundacao: formData.ano_fundacao ? parseInt(formData.ano_fundacao) : 0,
        numero_colaboradores: formData.numero_colaboradores ? parseInt(formData.numero_colaboradores) : 0,
        municipio_id: formData.municipio_id ? parseInt(formData.municipio_id) : 0,
        data_inicio: formData.data_inicio || null,
        data_fim: formData.data_fim || null,
        temas_ids: selectedTemas,
        ods_ids: selectedODS,
      }

      await cadastrarAcao(payload)
      showSnackbar('Ação cadastrada com sucesso!', 'success')
    } catch (error) {
      console.error('Erro ao cadastrar ação:', error)
      showSnackbar('Erro ao cadastrar ação. Tente novamente.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setNewTema({ nome: '', descricao: '' })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="border-b border-border bg-card py-8">
          <div className="container mx-auto px-4">
            <h1 className="mb-2 font-heading text-4xl font-bold">Cadastrar Nova Ação</h1>
            <p className="text-muted-foreground">Registre uma nova iniciativa de sustentabilidade do seu município</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Box component="form" onSubmit={handleSubmit} className="mx-auto max-w-7xl" sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Card className="!rounded-xl" sx={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>
                  Dados da Organização
                </Typography>
                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
                  <TextField
                    label="Nome da Organização, Grupo ou Indivíduo"
                    variant="outlined"
                    fullWidth
                    value={formData.nome_organizacao}
                    onChange={handleInputChange('nome_organizacao')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                  />
                  <TextField
                    label="Sigla ou Nome Fantasia"
                    variant="outlined"
                    fullWidth
                    value={formData.sigla_organizacao}
                    onChange={handleInputChange('sigla_organizacao')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                  />
                  <TextField
                    label="CNPJ ou CPF"
                    variant="outlined"
                    fullWidth
                    value={formData.documento_ator}
                    onChange={handleInputChange('documento_ator')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                  />
                  <FormControl fullWidth>
                    <InputLabel sx={{ fontFamily: 'Inter, sans-serif' }}>Tipo de Ator</InputLabel>
                    <Select 
                      label="Tipo de Ator"
                      value={formData.tipo_ator}
                      onChange={handleInputChange('tipo_ator')}
                      sx={inputStyles}
                    >
                      {tipoAtorOptions.map((tipo) => (
                        <MenuItem key={tipo} value={tipo} sx={{ fontFamily: 'Inter, sans-serif' }}>{tipo}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Ano de Fundação"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={formData.ano_fundacao}
                    onChange={handleInputChange('ano_fundacao')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                  />
                  <FormControl fullWidth>
                    <InputLabel sx={{ fontFamily: 'Inter, sans-serif' }}>Município</InputLabel>
                    <Select 
                      label="Município"
                      value={formData.municipio_id}
                      onChange={handleInputChange('municipio_id')}
                      sx={inputStyles}
                    >
                      {municipios.map((municipio) => (
                        <MenuItem key={municipio.id} value={municipio.id} sx={{ fontFamily: 'Inter, sans-serif' }}>
                          {municipio.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <TextField
                  label="Endereço Completo"
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  value={formData.endereco_completo}
                  onChange={handleInputChange('endereco_completo')}
                  InputProps={{ sx: inputStyles }}
                  InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                />
                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, mt: 2 }}>
                  <TextField
                    label="Região Administrativa"
                    variant="outlined"
                    fullWidth
                    value={formData.regiao_administrativa}
                    onChange={handleInputChange('regiao_administrativa')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                  />
                  <TextField
                    label="Website"
                    type="url"
                    variant="outlined"
                    fullWidth
                    value={formData.website}
                    onChange={handleInputChange('website')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                  />
                  <TextField
                    label="E-mail"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={formData.email_contato}
                    onChange={handleInputChange('email_contato')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                  />
                  <TextField
                    label="Telefone"
                    variant="outlined"
                    fullWidth
                    value={formData.telefone_contato}
                    onChange={handleInputChange('telefone_contato')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                  />
                  <TextField
                    label="Redes Sociais"
                    variant="outlined"
                    fullWidth
                    value={formData.redes_sociais}
                    onChange={handleInputChange('redes_sociais')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                  />
                  <FormControl fullWidth>
                    <InputLabel sx={{ fontFamily: 'Inter, sans-serif' }}>Abrangência Geográfica</InputLabel>
                    <Select 
                      label="Abrangência Geográfica"
                      value={formData.abrangencia_geografica}
                      onChange={handleInputChange('abrangencia_geografica')}
                      sx={inputStyles}
                    >
                      {abrangenciaOptions.map((abrang) => (
                        <MenuItem key={abrang} value={abrang} sx={{ fontFamily: 'Inter, sans-serif' }}>{abrang}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </CardContent>
            </Card>

            <Card className="!rounded-xl" sx={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>
                  ODS Prioritários e Temas de Atuação
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium', fontFamily: 'Inter, sans-serif' }}>
                    ODS Prioritários
                  </Typography>
                  <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
                    {allOds.map((ods) => (
                      <FormControlLabel
                        key={ods.id}
                        control={
                          <Checkbox
                            checked={selectedODS.includes(ods.id)}
                            onChange={() => handleODSChange(ods.id)}
                          />
                        }
                        label={`ODS ${ods.numero} - ${ods.nome}`}
                      />
                    ))}
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'medium', fontFamily: 'Inter, sans-serif' }}>
                      Temas Principais de Atuação
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Add />}
                      onClick={() => setIsModalOpen(true)}
                      sx={{
                        borderColor: 'var(--primary)',
                        fontFamily: 'Inter, sans-serif',
                        color: 'var(--primary)',
                        '&:hover': {
                          borderColor: 'var(--primary)',
                          backgroundColor: 'var(--primary)/0.06',
                        },
                      }}
                    >
                      Adicionar Tema
                    </Button>
                  </Box>
                  <FormControl fullWidth>
                    <InputLabel sx={{ fontFamily: 'Inter, sans-serif' }}>Selecione os temas</InputLabel>
                    <Select
                      multiple
                      value={selectedTemas}
                      onChange={handleTemaChange}
                      input={<OutlinedInput label="Selecione os temas" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((id) => {
                            const tema = allTemas.find(t => t.id === id)
                            return <Chip key={id} label={tema?.nome || id} size="small" />
                          })}
                        </Box>
                      )}
                      sx={inputStyles}
                    >
                      {allTemas.map((tema) => (
                        <MenuItem key={tema.id} value={tema.id} sx={{ fontFamily: 'Inter, sans-serif' }}>
                          {tema.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </CardContent>
            </Card>

            <Card className="!rounded-xl" sx={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>
                  Informações de Projeto
                </Typography>
                <FormControl component="fieldset" sx={{ mb: 3 }}>
                  <FormLabel component="legend" sx={{ fontFamily: 'Inter, sans-serif' }}>Status do Projeto</FormLabel>
                  <RadioGroup
                    value={projectStatus}
                    onChange={(e) => setProjectStatus(e.target.value)}
                    row
                  >
                    <FormControlLabel value="em-andamento" control={<Radio />} label="Em Andamento" />
                    <FormControlLabel value="desenvolvido" control={<Radio />} label="Desenvolvido" />
                  </RadioGroup>
                </FormControl>

                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
                  <TextField
                    label="Nome do Projeto"
                    variant="outlined"
                    fullWidth
                    value={formData.titulo}
                    onChange={handleInputChange('titulo')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                  />
                  <TextField
                    label="Data de Início"
                    type="date"
                    variant="outlined"
                    fullWidth
                    value={formData.data_inicio}
                    onChange={handleInputChange('data_inicio')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' }, shrink: true }}
                  />
                  {projectStatus === 'desenvolvido' && (
                    <TextField
                      label="Data de Término"
                      type="date"
                      variant="outlined"
                      fullWidth
                      value={formData.data_fim}
                      onChange={handleInputChange('data_fim')}
                      InputProps={{ sx: inputStyles }}
                      InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' }, shrink: true }}
                    />
                  )}
                </Box>
                
                <TextField
                  label="Descrição do Projeto"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  value={formData.descricao}
                  onChange={handleInputChange('descricao')}
                  InputProps={{ sx: inputStyles }}
                  InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                />
                
                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, mt: 2 }}>
                  <TextField
                    label="Público-alvo"
                    variant="outlined"
                    fullWidth
                    value={formData.publico_alvo}
                    onChange={handleInputChange('publico_alvo')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                  />
                  <TextField
                    label="Número de Colaboradores"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={formData.numero_colaboradores}
                    onChange={handleInputChange('numero_colaboradores')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                  />
                </Box>

                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, mt: 2 }}>
                  <TextField
                    label="Financiador"
                    variant="outlined"
                    fullWidth
                    value={formData.financiador}
                    onChange={handleInputChange('financiador')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                  />
                  <TextField
                    label="Valor do Financiamento"
                    variant="outlined"
                    fullWidth
                    value={formData.valor_financiamento}
                    onChange={handleInputChange('valor_financiamento')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                  />
                </Box>
                
                <TextField
                  label="Objetivos"
                  multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  value={formData.objetivos}
                  onChange={handleInputChange('objetivos')}
                  InputProps={{ sx: inputStyles }}
                  InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                />
                
                <TextField
                  label="Resultados Esperados"
                  multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  value={formData.resultados_esperados}
                  onChange={handleInputChange('resultados_esperados')}
                  InputProps={{ sx: inputStyles }}
                  InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                />

                <TextField
                  label="Resultados Alcançados"
                  multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  value={formData.resultados_alcancados}
                  onChange={handleInputChange('resultados_alcancados')}
                  InputProps={{ sx: inputStyles }}
                  InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                />

                <TextField
                  label="Aprendizados e Inovações"
                  multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  value={formData.aprendizados_inovacoes}
                  onChange={handleInputChange('aprendizados_inovacoes')}
                  InputProps={{ sx: inputStyles }}
                  InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                />
              </CardContent>
            </Card>

            <Card className="!rounded-xl" sx={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>
                  Parcerias e Impacto
                </Typography>
                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
                  <TextField
                    label="Parcerias Institucionais Relevantes"
                    variant="outlined"
                    fullWidth
                    value={formData.parcerias_envolvidas}
                    onChange={handleInputChange('parcerias_envolvidas')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                  />
                  <FormControl fullWidth>
                    <InputLabel sx={{ fontFamily: 'Inter, sans-serif' }}>Tipo de Parceria</InputLabel>
                    <Select 
                      label="Tipo de Parceria"
                      value={formData.tipo_parceria}
                      onChange={handleInputChange('tipo_parceria')}
                      sx={inputStyles}
                    >
                      {tiposParceria.map((tipo) => (
                        <MenuItem key={tipo} value={tipo} sx={{ fontFamily: 'Inter, sans-serif' }}>{tipo}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Período da Parceria"
                    variant="outlined"
                    fullWidth
                    value={formData.periodo_parceria}
                    onChange={handleInputChange('periodo_parceria')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                  />
                  <TextField
                    label="Área de Cooperação"
                    variant="outlined"
                    fullWidth
                    value={formData.area_cooperacao}
                    onChange={handleInputChange('area_cooperacao')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={<Checkbox checked={formData.possui_vinculo} onChange={handleInputChange('possui_vinculo')} />}
                    label="Possui vinculação a política pública"
                    sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'Inter, sans-serif' } }}
                  />
                  <TextField
                    label="Quais políticas públicas?"
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 1 }}
                    value={formData.vinculo_politica_publica}
                    onChange={handleInputChange('vinculo_politica_publica')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={<Checkbox checked={formData.participa_conselhos} onChange={handleInputChange('participa_conselhos')} />}
                    label="Participa de conselhos ou fóruns"
                    sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'Inter, sans-serif' } }}
                  />
                  <TextField
                    label="Quais conselhos ou fóruns?"
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 1 }}
                    value={formData.participacao_conselhos}
                    onChange={handleInputChange('participacao_conselhos')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={<Checkbox checked={formData.usa_dados_abertos} onChange={handleInputChange('usa_dados_abertos')} />}
                    label="Usa ou gera dados abertos"
                    sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'Inter, sans-serif' } }}
                  />
                  <TextField
                    label="Links de Relatórios"
                    type="url"
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 1 }}
                    value={formData.links_relatorios}
                    onChange={handleInputChange('links_relatorios')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                  />
                  <TextField
                    label="Exemplos de uso de dados"
                    multiline
                    rows={2}
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 1 }}
                    value={formData.exemplo_uso_dados}
                    onChange={handleInputChange('exemplo_uso_dados')}
                    InputProps={{ sx: inputStyles }}
                    InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                  />
                </Box>
              </CardContent>
            </Card>

            <Card className="!rounded-xl" sx={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>
                  Informações Complementares
                </Typography>
                <TextField
                  label="Tecnologias Sociais ou Digitais Utilizadas"
                  multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={formData.tecnologias_utilizadas}
                  onChange={handleInputChange('tecnologias_utilizadas')}
                  InputProps={{ sx: inputStyles }}
                  InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                />
                <TextField
                  label="Indicadores de Impacto Utilizados"
                  multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={formData.indicadores_impacto}
                  onChange={handleInputChange('indicadores_impacto')}
                  InputProps={{ sx: inputStyles }}
                  InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                />
                <TextField
                  label="Prêmios ou Reconhecimentos Recebidos"
                  multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={formData.premios_recebidos}
                  onChange={handleInputChange('premios_recebidos')}
                  InputProps={{ sx: inputStyles }}
                  InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                />
                <TextField
                  label="Observações Adicionais"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={formData.observacoes}
                  onChange={handleInputChange('observacoes')}
                  InputProps={{ sx: inputStyles }}
                  InputLabelProps={{ sx: { fontFamily: 'Inter, sans-serif' } }}
                />
              </CardContent>
            </Card>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                sx={{
                  borderColor: 'var(--border)',
                  color: 'var(--muted-foreground)',
                  '&:hover': {
                    borderColor: 'var(--primary)',
                  },
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                type="submit"
                disabled={isLoading}
                startIcon={<Save />}
                sx={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  '&:hover': {
                    backgroundColor: 'var(--primary)',
                    opacity: 0.9,
                  },
                }}
              >
                {isLoading ? 'Salvando...' : 'Salvar Cadastro'}
              </Button>
            </Box>
          </Box>
        </div>
      </main>

      <Footer />

      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 'medium' }}>
          Adicionar Novo Tema
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'grid', gap: 3 }}>
            <TextField
              label="Nome do Tema"
              fullWidth
              value={newTema.nome}
              onChange={(e) => setNewTema({ ...newTema, nome: e.target.value })}
              sx={inputStyles}
            />
            <TextField
              label="Descrição"
              fullWidth
              multiline
              rows={3}
              value={newTema.descricao}
              onChange={(e) => setNewTema({ ...newTema, descricao: e.target.value })}
              sx={inputStyles}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleCloseModal}
            sx={{ 
              fontFamily: 'Inter, sans-serif',
              color: 'gray'
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleAddNewTema}
            variant="contained"
            disabled={!newTema.nome.trim()}
            sx={{
              backgroundColor: 'var(--primary)',
              '&:hover': { backgroundColor: '#b91c1c' },
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
