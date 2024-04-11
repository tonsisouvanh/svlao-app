import axios from "axios";

// axios.defaults.baseURL = `${import.meta.env.VITE_API_DOMAIN}`;

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN,
  withCredentials: true,
});

export default apiRequest;
