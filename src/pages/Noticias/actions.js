import { api } from "../../services/api";

export async function getNoticias() {
  const resp = await api.get("/noticias");

  // NOTA: Algumas notícias têm data_publicacao incorreta no banco (ex: "2025-04-14" em vez de "2026-04-14").
  // O fix definitivo deve ser feito no back-end corrigindo o ano dos registros.
  const noticiasOrdenadas = resp.data.sort((a, b) => {
    return new Date(b.data_publicacao) - new Date(a.data_publicacao);
  });

  return noticiasOrdenadas;
}

