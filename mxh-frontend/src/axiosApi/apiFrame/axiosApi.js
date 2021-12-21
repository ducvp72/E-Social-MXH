import axios from "axios";
import Cookies from "universal-cookie";
const baseURL = process.env.REACT_APP_BACKEND_URL;

const cookies = new Cookies();
const currentRefresh = cookies?.get("auth")?.tokens.refresh.token;

const axiosApi = async (
  endpoint,
  method = "GET",
  data = null,
  params = null,
  token = null
) => {
  let result;

  result = await axios({
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

  if (result.status === 401 || result.status === 503) {
    console.log("cookies hien tai", currentRefresh);
    axios({
      method: "post",
      url: "https://mxhld.herokuapp.com/v1/refresh-tokens",
      data: {
        refreshToken: currentRefresh,
      },
    })
      .then((res) => {
        console.log("New", res.data);
        cookies?.set("auth", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else return result;
};

export default axiosApi;
