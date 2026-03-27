import axios from "axios";

const api = axios.create({
  baseURL: "/auth",
  withCredentials: true,
});

export const googleAuth = (code) => api.get(`/google?code=${code}`);

export default api;
 
