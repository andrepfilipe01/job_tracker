import axios from "axios";

const API_URL = "http://localhost:5000/api/jobs"; // Update with Express API URL

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export default api;

