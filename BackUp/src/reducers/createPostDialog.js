const initState = {
  show: false,
};

const stateInit = {
  showChange: false,
};

const SET_DIALOG = "DIALOG_SET";
const DIALOG_CHANGE = "CHANGE_DIALOG";

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

export const setDialogAction = (show) => {
  return {
    type: SET_DIALOG,
    payload: show,
  };
};

// export const ChangePostDialogReducer = (
//   state = stateInit,
//   { type, payload }
// ) => {
//   switch (type) {
//     case DIALOG_CHANGE:
//       console.log(payload);
//       return { showChange: payload };
//     default:
//       return { ...state };
//   }
// };

// export const setDialogChange = (show) => {
//   return {
//     type: DIALOG_CHANGE,
//     payload: show,
//   };
// };
