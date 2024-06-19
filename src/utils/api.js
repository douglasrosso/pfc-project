import { message } from "antd";
import axios from "axios";

export const api = axios.create({ baseURL: process.env.APP_URL });

api.interceptors.response.use(
  function (response) {
    if (!response.data.success && response.data.message) {
      message.error(response.data.message);
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
