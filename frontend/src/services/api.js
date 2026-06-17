import axios from "axios";

const api = axios.create({
  baseURL: "https://api-kemanaduitku.vercel.app",
  withCredentials: true,
});

export default api;
