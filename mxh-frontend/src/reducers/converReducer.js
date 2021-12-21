import { chatApi } from "./../axiosApi/api/chatApi";
import { REHYDRATE } from "redux-persist";

const initialState = {
  data: [],
  next: [],
  pageNext: 2,
  totalPages: 0,
  totalResults: 0,
  more: true,
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
      state.next = [];
      state.pageNext = 2;
      state.totalPages = payload.totalPages;
      state.totalResults = payload.totalResults;
      state.error = null;
      if (state.pageNext > state.totalPages) state.more = false;
      else state.more = true;
      return { ...state };
    }

    case "ADD_MORE": {
      state.next = payload.results;
      if (state.pageNext > state.totalPages) state.more = false;
      else {
        state.data = [...state.data, ...state.next];
        state.pageNext = state.pageNext + 1;
        state.more = true;
      }
      return { ...state };
    }

    case "LOG_OUT_CONVER": {
      state.data = [];
      state.next = [];
      state.pageNext = 0;
      state.totalPages = 0;
      state.totalResults = 0;
      state.error = null;
      state.more = true;
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
        dispatch({
          type: "ADD_MORE",
          payload: result.data,
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
