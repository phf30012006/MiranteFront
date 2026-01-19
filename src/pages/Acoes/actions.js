import { api } from "../../services/api";

export async function getAcoes() {
  const resp = await api.get("/acoes");
  return resp.data;
}
