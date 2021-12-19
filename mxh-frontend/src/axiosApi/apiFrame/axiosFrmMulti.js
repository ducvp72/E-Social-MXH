import axios from "axios";
const baseURL = process.env.REACT_APP_BACKEND_URL;

const axiosFrmMulti = (
  endpoint,
  method = "GET",
  data = null,
  params = null,
  token = null,
  showLoading
) => {
  return axios({
    url: `${baseURL}/${endpoint}`,
    method,
    data,
    params: params ? params : null,
    headers: token
      ? {
          Authorization: `Bearer ${token}`, // cach 1 cai
        }
      : null,
    onUploadProgress: showLoading,
  });
};

export default axiosFrmMulti;
