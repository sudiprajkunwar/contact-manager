import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const Axios: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

// Add a request interceptor
Axios.interceptors.request.use(function (config: any) {
  const token = `Bearer ${Cookies.get("token")}`;
  console.log(config, "con");
  config.headers.Authorization = token;

  return config;
});

export default Axios;
