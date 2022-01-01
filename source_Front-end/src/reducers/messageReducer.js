import { chatApi } from "./../axiosApi/api/chatApi";
const initialState = {
  data: [],
  total: 0,
  error: null,
};

export const messageReducer = (
  state = initialState,
  { type, payload, ...action }
) => {
  switch (type) {
    case "GET_MESSAGE":
      state.data = payload.results.reverse();
      state.total = payload.totalResults;
      state.error = null;

      return { ...state };

    // case "GET_MORE_MESS": {
    //   state.next = payload.results;
    //   if (state.pageNext > state.totalPages) state.more = false;
    //   else {
    //     state.data = [...state.data, ...state.next];
    //     state.pageNext = state.pageNext + 1;
    //     state.more = true;
    //   }
    //   return { ...state };
    // }

    case "ADD_MESSAGE": {
      state.data = [...state.data, { ...payload }];
      return { ...state };
    }

    case "RECALL_MESSAGE": {
      const length = state.data.length;
      if (length > payload.index) {
        state.data[payload.index] = {
          content: null,
          incomming: true,
          conversationId: payload.value.conversationId,
          createdAt: payload.value.createdAt,
          id: payload.value.id,
          sender: payload.value.sender,
          typeMessage: "RECALL",
        };
      }
      return { ...state };
    }

    case "LOG_OUT_MESSAGE": {
      state.data = [];
      state.total = 0;
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

// export const actGetMoreMess = (token, converId, page, limit) => {
//   return (dispatch) => {
//     chatApi
//       .getMessByIdConverByPage(token, converId, page, limit)
//       .then((rs) => {
//         dispatch({
//           type: "GET_MORE_MESS",
//           payload: rs.data,
//         });
//       })
//       .catch((err) => {
//         console.log("Loi o day", err);
//       });
//   };
// };

export const actAddMessage = (data) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_MESSAGE",
      payload: data,
    });
  };
};

export const actRecallMessage = (value, index) => {
  const temp = {
    value,
    index,
  };
  // console.log("temp", temp);
  return (dispatch) => {
    dispatch({
      type: "RECALL_MESSAGE",
      payload: temp,
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
