import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

export default instance;