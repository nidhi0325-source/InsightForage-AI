import axios from "axios";

const api = axios.create({
  baseURL: "https://insightforage-ai.onrender.com/api",
});

export default api;