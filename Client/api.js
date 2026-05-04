import axios from "axios";

const BACKEND_URL = import.meta.env.PROD ? "https://saathi-ai-in-mern.onrender.com" : "";

const api = axios.create({
  baseURL: `${BACKEND_URL}/auth`,
  withCredentials: true,
});

export const googleAuth = (code) => api.get(`/google?code=${code}`);

export default api;
 
