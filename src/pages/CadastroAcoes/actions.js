import { api } from "../../services/api";

export async function getMunicipios() {
  const resp = await api.get("/municipios");
  return resp.data;
}

export async function getOds() {
  const resp = await api.get("/ods");
  return resp.data;
}

export async function getTemas() {
  const resp = await api.get("/temas");
  return resp.data;
}

export async function cadastrarAcao(data) {
  const payload = {
    nome_organizacao: data.nome_organizacao,
    sigla_organizacao: data.sigla_organizacao,
    documento_ator: data.documento_ator,
    tipo_ator: data.tipo_ator,
    ano_fundacao: data.ano_fundacao,
    endereco_completo: data.endereco_completo,
    regiao_administrativa: data.regiao_administrativa,
    website: data.website,
    email_contato: data.email_contato,
    telefone_contato: data.telefone_contato,
    redes_sociais: data.redes_sociais,
    abrangencia_geografica: data.abrangencia_geografica,
    status: data.status,
    titulo: data.titulo,
    data_inicio: data.data_inicio,
    data_fim: data.data_fim,
    descricao: data.descricao,
    publico_alvo: data.publico_alvo,
    numero_colaboradores: data.numero_colaboradores,
    financiador: data.financiador,
    valor_financiamento: data.valor_financiamento,
    objetivos: data.objetivos,
    resultados_esperados: data.resultados_esperados,
    resultados_alcancados: data.resultados_alcancados,
    aprendizados_inovacoes: data.aprendizados_inovacoes,
    parcerias_envolvidas: data.parcerias_envolvidas,
    tipo_parceria: data.tipo_parceria,
    periodo_parceria: data.periodo_parceria,
    area_cooperacao: data.area_cooperacao,
    possui_vinculo: data.possui_vinculo,
    vinculo_politica_publica: data.vinculo_politica_publica,
    participa_conselhos: data.participa_conselhos,
    participacao_conselhos: data.participacao_conselhos,
    usa_dados_abertos: data.usa_dados_abertos,
    links_relatorios: data.links_relatorios,
    exemplo_uso_dados: data.exemplo_uso_dados,
    tecnologias_utilizadas: data.tecnologias_utilizadas,
    indicadores_impacto: data.indicadores_impacto,
    premios_recebidos: data.premios_recebidos,
    observacoes: data.observacoes,
    municipio_id: data.municipio_id,
    temas_ids: data.temas_ids,
    ods_ids: data.ods_ids,
  };

  const resp = await api.post("/acoes", payload);
  return resp.data;
}

export async function cadastrarTema(data) {
  const payload = {
    nome: data.nome,
    descricao: data.descricao || "",
  };

  const resp = await api.post("/temas", payload);
  return resp.data;
}
