import { api } from "../../services/api";

export async function getAcaoById(id) {
  const resp = await api.get(`/acoes/${id}`);
  return resp.data;
}
