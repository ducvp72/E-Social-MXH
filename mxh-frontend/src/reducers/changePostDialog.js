const DIALOG_CHANGE = "CHANGE_DIALOG";
const DIALOG_ACTION = "ACTION_DIALOG";
const CLOSE_ALL = "CLOSE_ALL_DIALOG";
const InitState = {
  showChange: false,
  showAction: false,
  data: null,
};

export const ChangePostDialogReducer = (
  state = InitState,
  { type, payload }
) => {
  switch (type) {
    case DIALOG_CHANGE:
      return { showChange: payload, showAction: false, data: null };
    case DIALOG_ACTION:
      return { showChange: false, showAction: payload, data: null };
    case CLOSE_ALL:
      return { showChange: false, showAction: false, data: null };
    default:
      return { ...state };
  }
};

export const setDialogChange = (show) => {
  return {
    type: DIALOG_CHANGE,
    payload: show,
  };
};

export const setDialogAction = (show) => {
  return {
    type: DIALOG_ACTION,
    payload: show,
  };
};

export const setDialogCloseAll = () => {
  return {
    type: CLOSE_ALL,
  };
};
