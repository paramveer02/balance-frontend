import axios from "axios";

const ENV_ORIGIN = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const API_ORIGIN = ENV_ORIGIN || "http://localhost:3100"; // dev fallback

const customFetch = axios.create({
  baseURL: `${API_ORIGIN}/api/v1`,
  withCredentials: true,
});

export default customFetch;
