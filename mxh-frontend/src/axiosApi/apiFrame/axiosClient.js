import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;
let headers = {};

console.log("BaseURl: ", baseURL);

if (localStorage.token) {
  headers.Authorization = `Bearer ${localStorage.token}`;
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers,
});

export default axiosInstance;
