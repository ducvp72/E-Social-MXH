import axios from "axios";
const baseURL = process.env.REACT_APP_BACKEND_URL;

const axiosApi = (
  endpoint,
  method = "GET",
  data = null,
  params = null,
  token = null
) => {
  console.log("token22342342", token);
  return axios({
    url: `${baseURL}/${endpoint}`,
    method,
    data,
    params: params ? params : null,
    headers: token
      ? {
          Authorization: `Bearer  ${token}`,
        }
      : null,
  });
};

export default axiosApi;
