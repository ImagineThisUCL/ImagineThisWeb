import axios from 'axios';

const API_SERVER_ADDR = process.env.NODE_ENV === 'production' ?
  "http://213.168.248.64:8080" : "http://localhost:8080";

const api = axios.create({
  baseURL: `${API_SERVER_ADDR}/api/v1`
});

export default api;
