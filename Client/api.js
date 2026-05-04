import axios from "axios";

const BACKEND_URL = import.meta.env.PROD ? "" : "http://127.0.0.1:8080";

const api = axios.create({
  baseURL: `${BACKEND_URL}/auth`,
  withCredentials: true,
});

export const googleAuth = (code) => api.get(`/google?code=${code}`);

export default api;
 
