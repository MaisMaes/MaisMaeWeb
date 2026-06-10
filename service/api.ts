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