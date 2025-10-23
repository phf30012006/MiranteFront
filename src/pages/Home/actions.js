import { api } from "../../services/api";

export async function getHomeData() {
	const resp = await api.get('/home/')
	return resp.data
}

