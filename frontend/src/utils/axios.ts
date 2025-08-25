import Api_confige from "@/api/apiconfige";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: Api_confige.API_BASE_URL,
  withCredentials: true,
});

export default axiosInstance ;
