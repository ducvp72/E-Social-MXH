const init = {
  openCall: true,
  flag: null,
};

export const CallReducer = (state = init, { type, payload }) => {
  switch (type) {
    case "OPEN_CALL":
      return { openCall: payload.show, flag: payload.check };
    default:
      return { ...state };
  }
};

export const setWindowCall = (data) => {
  return {
    type: "OPEN_CALL",
    payload: data,
  };
};
