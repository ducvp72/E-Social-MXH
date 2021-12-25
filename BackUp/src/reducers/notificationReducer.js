import { postApi } from "../axiosApi/api/postApi";

const initialState = {
  data: [],
  next: [],
  pageNext: 2,
  totalPages: 0,
  totalResults: 0,
  loading: true,
  error: null,
};

// Child reducer
export const notifyReducer = (
  state = initialState,
  { type, payload, ...action }
) => {
  switch (type) {
    case "GET_NOTIFY": {
      state.data = payload.results;
      state.next = [];
      state.pageNext = 2;
      state.totalPages = payload.totalPages;
      state.totalResults = payload.totalResults;
      state.loading = false;
      state.error = null;
      return { ...state };
    }

    case "ADD_MORE": {
      state.next = payload.results;
      if (state.next.length > 0) {
        state.data = [...state.data, ...state.next];
        state.pageNext = state.pageNext + 1;
      }
      return { ...state };
    }

    case "LOG_OUT": {
      state.data = [];
      state.next = [];
      state.pageNext = 0;
      state.totalPages = 0;
      state.totalResults = 0;
      state.error = null;
      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
};

export const actGetMyNotify = (token, firstPage, limit) => {
  return (dispatch) => {
    postApi
      .getMyPost(token, firstPage, limit)
      .then((result) => {
        // console.log("ReduxNotifiCation", result.data.results);
        dispatch({
          type: "GET_NOTIFY",
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log("getNotify", error);
      });
  };
};

export const actLoadMoreNotify = (token, firstPage, limit) => {
  return (dispatch) => {
    postApi
      .getMyPost(token, firstPage, limit)
      .then((result) => {
        // console.log("ReduxMore", result.data.results);
        dispatch({
          type: "ADD_MORE",
          payload: result.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const actLogoutNotify = () => {
  return (dispatch) => {
    dispatch({
      type: "LOG_OUT",
    });
  };
};
