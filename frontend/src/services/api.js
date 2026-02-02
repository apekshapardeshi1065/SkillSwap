import axios from "axios";

const API = axios.create({
  baseURL: "https://skillswap-backend-b9h3.onrender.com",
});

export default API;
