import { message } from "antd";
import axios from "axios";

export const api = axios.create({ baseURL: "http://localhost:3000" });

api.interceptors.response.use(
  function (response) {
    if (!response.success && response.message) {
      message.error(response.message);
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
