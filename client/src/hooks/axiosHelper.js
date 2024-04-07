/* eslint-disable no-debugger */
import axios from "axios";
import { tokenHelper } from "./tokenHelper";

const baseURL = "http://localhost:5000/";
//'http://localhost:5001'

const axiosHelper = axios.create();

// Axios Defaults
axiosHelper.defaults.baseURL = baseURL;
axiosHelper.defaults.headers.post["Content-Type"] = "application/json";

// interceptors
axiosHelper.interceptors.request.use(
  (config) => {
    if (!config.headers) return config;
    const token = tokenHelper.getToken() || null;
    config.headers.common["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // alert(error.response.data.message);
    throw error;
  }
);
axiosHelper.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    // alert(error.response.data.message);
    throw error;
  }
);
export { axiosHelper };
