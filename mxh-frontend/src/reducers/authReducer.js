import axios from "axios";
import { Cookies } from "react-cookie";
import { userApi } from "./../axiosApi/api/userApi";

const initialState = {
  data: null,
  error: null,
};

// Child reducer
export const authReducer = (
  state = initialState,
  { type, payload, ...action }
) => {
  switch (type) {
    case "LOGIN_REQUEST": {
      state.data = null;
      state.error = null;
      return { ...state };
    }

    case "LOGIN_SUCCESS": {
      state.data = payload;
      state.error = null;
      return { ...state };
    }

    case "LOGIN_FAILED": {
      state.data = null;
      state.error = payload;
      return { ...state };
    }

    case "LOG_OUT": {
      state.data = null;
      state.error = null;
      return { ...state };
    }

    case "UPDATE_USER": {
      state.data = payload;
      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
};

export const actLogin = (user, history) => {
  return (dispatch) => {
    dispatch(actLoginRequest());
    userApi
      .signIn(user)
      .then((result) => {
        dispatch(actLoginSuccess(result.data.user));
        new Cookies().set("tokens", result.data.tokens);
        console.log("axiosApi");
        if (history) {
          history.replace("/");
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(actLoginFailed(error.response?.data));
      });
  };
};

export const actLogout = (token) => {
  return (dispatch) => {
    axios({
      url: `https://mxhld.herokuapp.com/v1/auth/logout`,
      method: "POST",
      data: { refreshToken: token },
    })
      .then((result) => {
        dispatch({
          type: "LOG_OUT",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const actUpdateUser = (token) => {
  return (dispatch) => {
    userApi
      .getAuthentication(token)
      .then((result) => {
        //get data by authentication to update state User in redux stored
        dispatch({
          type: "UPDATE_USER",
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log("Error update account", error.response);
      });
  };
};

export const actLoginRequest = () => {
  return {
    type: "LOGIN_REQUEST",
  };
};
export const actLoginSuccess = (data) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: data,
  };
};
export const actLoginFailed = (error) => {
  return {
    type: "LOGIN_FAILED",
    payload: error,
  };
};
