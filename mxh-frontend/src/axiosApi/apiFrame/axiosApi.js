import axios from "axios";
const baseURL = process.env.REACT_APP_BACKEND_URL;

const axiosApi = (
  endpoint,
  method = "GET",
  data = null,
  params = null,
  token = null
) => {
  return axios({
    url: `${baseURL}/${endpoint}`,
    method,
    data,
    params: params ? params : null,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        }
      : null,
  });
};

export default axiosApi;
