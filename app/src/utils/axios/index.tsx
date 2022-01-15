import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const Axios: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,

  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});

export default Axios;
