import { api } from "../../services/api";

export async function getNoticias() {
  const resp = await api.get("/noticias");

  const noticiasOrdenadas = resp.data.sort((a, b) => {
    return new Date(b.data_publicacao) - new Date(a.data_publicacao);
  });
  return noticiasOrdenadas;
}
