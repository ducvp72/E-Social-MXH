import axios from "axios";
import { Cookies } from "react-cookie";
import { userApi } from "../axiosApi/api/userApi";

export const createAxiosResponseInterceptor = () => {
  const interceptor = axios.interceptors.response.use(
    (response) => {
      console.log("interceptor", response);

      return response.data;
    },
    (error) => {
      // Reject promise if usual error
      console.log(error);
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }

      /*
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response
       */
      axios.interceptors.response.eject(interceptor);

      return axios
        .post("/api/refresh_token", {
          refreshToken: new Cookies().get("auth").tokens.refresh.token,
        })
        .then((response) => {
          console.log("interceptor", response);
          new Cookies().set("tokens", response); //tokens
          //tokens
          error.response.config.headers["Authorization"] =
            "Bearer " + response.access.token;

          return axios(error.response.config);
        })
        .catch((error) => {
          new Cookies().remove("auth");
          userApi.logOut(new Cookies().get("auth").tokens.refresh.token);
          this.router.push("/");
          return Promise.reject(error);
        })
        .finally(createAxiosResponseInterceptor);
    }
  );

  return {
    interceptor,
  };
};
