import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const root = localStorage.getItem("persist:root");
const user = root ? JSON.parse(root).user : null;
const TOKEN = user ? JSON.parse(user).currentUser?.token : "";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
