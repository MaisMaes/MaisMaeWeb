import axios from "axios";
import type { News } from "../src/pages/Publicacoes";
//endpoint para login 
export const api = axios.create({
  baseURL: "http://localhost:8080",
});

export async function getNews(page = 0, size = 10) {
  const response = await api.get(`/infocards?pagina=${page}&tamanho=${size}`);
  return response.data;
}

export async function updateNews(id: string, data: {
  titulo: string;
  descricao: string;
  imagem: string;
  link: string;
  destaque: boolean;
  ativo: boolean;
}) {
  const response = await api.put(`/infocards/${id}`, data);
  return response.data;
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// export async function updateNewsHighlight(id: string, destaque: boolean) {
//   const response = await api.patch(`/infocards/${id}`, {
//     destaque,
//   });

//   return response.data;
// }

export async function updateNewsHighlight(news: News) {
  const response = await api.put(`/infocards/${news.id}`, {
    titulo: news.titulo,
    descricao: news.descricao,
    imagem: news.imagem,
    link: news.link,
    destaque: !news.destaque,
    ativo: news.ativo,
  });

  return response.data;
}

export async function deleteNews(id: string) {
  await api.delete(`/infocards/${id}`);
}

export async function createNews(data: {
  titulo: string;
  descricao: string;
  imagem: string;
  link: string;
}) {
  const response = await api.post("/infocards", data);
  return response.data;
}


export async function getLoggedUser() {
  const response = await api.get("/usuario/me");
  return response.data;
}

export async function updateUserProfile(data: {
  nome: string;
  telefone: string;
  senha?: string;
  email: string;
}) {
  const response = await api.patch("/usuario/atualizar", data);
  return response.data;
}

export async function getGroups() {
  const response = await api.get("/grupo-tematico/listar");
  return response.data;
}

// export async function deleteGroup(id: number) {
//   await api.delete(`/grupo-tematico/${id}`);
// }

export async function deleteGroup(id: number) {
  await api.delete(`/grupo-tematico/excluir/${id}`);
}