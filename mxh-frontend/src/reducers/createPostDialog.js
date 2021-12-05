const initState = {
  show: false,
};

export const createPostDialogReducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case SET_DIALOG:
      return { show: payload };
    default:
      return { ...state };
  }
};

const SET_DIALOG = "DIALOG_SET";

export const setDialogAction = (show) => {
  return {
    type: SET_DIALOG,
    payload: show,
  };
};
