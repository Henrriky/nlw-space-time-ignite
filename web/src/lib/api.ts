import axios from "axios";

export const api = axios.create({
    baseURL: "http://0.0.0.0:3333",
    // baseURL: "http://localhost:3333",
})