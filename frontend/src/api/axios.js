import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

console.log(VITE_BACKEND_URL)
export const api = axios.create({
    baseURL: VITE_BACKEND_URL + "/api",
    withCredentials: true,
});