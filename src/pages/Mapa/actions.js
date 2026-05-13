import { api } from "../../services/api";

export const getMunicipios = async () => {
  try {
    const response = await api.get("/municipios/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar municípios:", error);
    throw error;
  }
};

export const getMunicipioDetalhes = async (id) => {
  try {
    const response = await api.get(`/municipios/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do município:", error);
    throw error;
  }
};

export const getAcoesPorMunicipio = async (municipioId) => {
  try {
    const response = await api.get(`/acoes/?municipio_id=${municipioId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar ações do município:", error);
    throw error;
  }
};
