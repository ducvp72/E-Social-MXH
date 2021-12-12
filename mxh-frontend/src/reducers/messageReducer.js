import { chatApi } from "./../axiosApi/api/chatApi";
const initialState = {
  data: [],
  next: [],
  pageNext: 2,
  totalPages: 0,
  totalResults: 0,
  loading: true,
  error: null,
};

export const messageReducer = (
  state = initialState,
  { type, payload, ...action }
) => {
  switch (type) {
    case "GET_MESSAGE": {
      // console.log("Vao Day", payload.results);
      state.data = payload.results;
      state.next = [];
      state.pageNext = 2;
      state.totalPages = payload.totalPages;
      state.totalResults = payload.totalResults;
      state.loading = false;
      state.error = null;
      return { ...state };
    }

    case "GET_MORE_MESS": {
      state.next = payload.results;
      if (state.next.length > 0) {
        state.data = [...state.data, ...state.next];
        state.pageNext = state.pageNext + 1;
      }
      return { ...state };
    }

    case "LOG_OUT_MESSAGE": {
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

export const actGetMess = (token, converId, page, limit) => {
  return (dispatch) => {
    chatApi
      .getMessByIdConver(token, converId, page, limit)
      .then((rs) => {
        // console.log("ListConvers", rs.data);
        dispatch({
          type: "GET_MESSAGE",
          payload: rs.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const actGetMoreMess = (token, converId, page, limit) => {
  return (dispatch) => {
    chatApi
      .getMessByIdConver(token, converId, page, limit)
      .then((rs) => {
        // console.log("ListConverMore", rs.data.results);
        dispatch({
          type: "GET_MORE_MESS",
          payload: rs.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const actLogoutMess = () => {
  return (dispatch) => {
    dispatch({
      type: "LOG_OUT_MESSAGE",
    });
  };
};
