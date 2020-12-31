import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/",
  responseType: "json",
  headers: { "auth-token": localStorage.getItem("auth-token") },
});
export default instance;
