import axios from "axios";
import DeviceApi from "./deviceAPI";

export default class AppAPI {
    constructor(store) {
        this.$host = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
        })

        this.$authHost = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
        })
        const authInterceptor = (config) => {
            config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
            return config;
        }
        this.$authHost.interceptors.request.use(authInterceptor);

        this.device = new DeviceApi(this, store);
    }
  }