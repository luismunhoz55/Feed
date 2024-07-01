import axios from "axios";

export const api = axios.create({
  baseURL: "https://feed-backend-serverless.vercel.app/api/",
});
