import { chatApi } from "./../axiosApi/api/chatApi";
import { REHYDRATE } from "redux-persist";

const initialState = {
  data: [],
  totalPages: 0,
  totalResults: 0,
  loading: true,
  error: null,
};

// Child reducer
export const converReducer = (
  state = initialState,
  { type, payload, ...action }
) => {
  // console.log(type);
  // console.log(payload?.data);
  switch (type) {
    // case REHYDRATE: {
    //   return { ...state, data: payload?.data || null };
    // }

    case "GET_SUCCES_CONVER": {
      state.data = payload.results;
      state.totalPages = payload.totalPages;
      state.totalResults = payload.totalResults;
      state.loading = false;
      state.error = null;
      return { ...state };
    }

    case "ADD_MORE": {
      console.log("Payload", ...payload);
      console.log("State", ...state.data);
      state.data = [...state.data, ...payload];
      return { ...state };
    }

    case "LOG_OUT_CONVER": {
      state.data = [];
      state.totalPages = 0;
      state.totalResults = 0;
      state.error = null;
      return { ...state };
    }

    case "GET_FAIL": {
      state.data = [];
      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
};

export const actGetMyConver = (token, firstPage, limit) => {
  return (dispatch) => {
    chatApi
      .getConverByToken(token, firstPage, limit)
      .then((result) => {
        // console.log("ReduxConver", result.data.results);
        dispatch({
          type: "GET_SUCCES_CONVER",
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log("getConver", error);
      });
  };
};

export const actLoadMore = (token, firstPage, limit) => {
  return (dispatch) => {
    chatApi
      .getConverByToken(token, firstPage, limit)
      .then((result) => {
        // console.log("ReduxMore", result.data.results);
        dispatch({
          type: "ADD_MORE",
          payload: result.data.results,
        });
      })
      .catch((error) => {
        console.log("getMoreConver", error);
      });
  };
};

export const actLogoutConver = () => {
  return (dispatch) => {
    dispatch({
      type: "LOG_OUT_CONVER",
    });
  };
};
