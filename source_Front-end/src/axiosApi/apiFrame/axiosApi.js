import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
const baseURL = process.env.REACT_APP_BACKEND_URL;

const cookies = new Cookies();
// const currentRefresh = cookies?.get("auth")?.tokens.refresh.token;

const onSuccess = function (response) {
  return response;
};

const onError = function (error) {
  console.log("Request Failed:", window.location.pathname);
  if (window.location.pathname !== "/login") {
    if (error.response) {
      const { code } = error.response.data;
      if (code === 401) {
        Swal.fire({
          icon: "error",
          title: "Your token was expired, please login again !",
          showConfirmButton: false,
          timer: 1500,
        });
        cookies?.remove("auth", { path: "/" });
        window.location.replace("/");
        console.error("Check", code);
      }
      if (code === 500) {
        Swal.fire({
          icon: "error",
          title: "Server was on busy, please try again !",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      console.error("Error Message:", error.message);
    }
  }
  return Promise.reject(error);
};

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
  })
    .then(onSuccess)
    .catch(onError);
};

export default axiosApi;
