import axios from "axios";
//endpoint para login 
export const api = axios.create({
  baseURL: "http://localhost:8080",
});