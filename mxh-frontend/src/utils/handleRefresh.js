import axios from "axios";
import { Cookies } from "react-cookie";
import { userApi } from "../axiosApi/api/userApi";
import { useEffect } from "react";

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

// Slide Large Array into Group of Array
export const sliceIntoChunks = (arr, chunkSize) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
};

export const useOnClickOutside = (buttonRef, modalRef, setActive) => {
  useEffect(() => {
    /**
     * Close modal
     */
    const handleClickOutside = (event) => {
      // Click at avatar button to close
      if (buttonRef.current && buttonRef.current.contains(event.target)) {
        return;
      }
      // Handle click outside to close modal
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setActive();
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [buttonRef, buttonRef, setActive]);
};
