import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // ✅ make sure this matches backend port
});

export default api;
