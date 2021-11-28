import axios from "axios";
import { Cookies } from "react-cookie";
import { userApi } from "./../axiosApi/api/userApi";

const initialState = {
  data: null,
  error: null,
};

// Child reducer
export const myPostReducer = (
  state = initialState,
  { type, payload, ...action }
) => {
  switch (type) {
    case "GET_SUCCES": {
      state.data = payload;
      state.error = null;
      return { ...state };
    }

    case "GET_FAIL": {
      state.data = null;
      state.error = payload;
      return { ...state };
    }

    case "LOG_OUT_POST": {
      state.data = null;
      state.error = null;
      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
};
