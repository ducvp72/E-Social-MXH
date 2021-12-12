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
      console.log("Vao Day");
      state.data = payload.results.reverse();
      state.next = [];
      state.pageNext = 2;
      state.totalPages = payload.totalPages;
      state.totalResults = payload.totalResults;
      state.loading = false;
      state.error = null;
      return { ...state };
    }

    case "GET_MORE_MESS": {
      // console.log("mang can them", state.data);
      // console.log("More", payload.results);
      state.next = payload.results;
      if (state.next.length > 0) {
        state.data = [...state.data, ...state.next];
        state.pageNext = state.pageNext + 1;
      }
      return { ...state };
    }

    case "ADD_MESSAGE": {
      // console.log("mang can them", state.data);
      // console.log("dataMessage", payload);
      state.data = [{ ...payload }, ...state.data];
      // console.log("StateData", state.data);
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

export const actGetMess = (token, converId) => {
  return (dispatch) => {
    chatApi
      .getMessByIdConver(token, converId)
      .then((rs) => {
        // console.log("ListConvers", rs.data.results);
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
        console.log("ListConverMore", rs.data.results);
        dispatch({
          type: "GET_MORE_MESS",
          payload: rs.data,
        });
      })
      .catch((err) => {
        console.log("Loi o day", err);
      });
  };
};

export const actAddMessage = (data) => {
  console.log("actAdd", data);
  return (dispatch) => {
    dispatch({
      type: "ADD_MESSAGE",
      payload: data,
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
