import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { authReducer } from "../reducers/authReducer";
import { createPostDialogReducer } from "./../reducers/createPostDialog";
import { ChangePostDialogReducer } from "./../reducers/changePostDialog";
import { converReducer } from "./../reducers/converReducer";
import { notifyReducer } from "./../reducers/notificationReducer";
import { messageReducer } from "./../reducers/messageReducer";
import { fileReducer } from "../reducers/fileReducer";
import { mediaReducer } from "../reducers/mediaReducer";
import { CallReducer } from "./../reducers/callReducer";
import { parse, stringify } from "flatted";
import { createTransform } from "redux-persist";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blackList: ["auth"],
};

const authPersistConfig = {
  key: "auth",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whiteList: ["auth"],
};

const converPersistConfig = {
  key: "conver",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whiteList: ["conver"],
};

const messagePersistConfig = {
  key: "message",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whiteList: ["message"],
};

const filePersistConfig = {
  key: "file",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whiteList: ["file"],
};

const MediaPersistConfig = {
  key: "media",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whiteList: ["media"],
};

export const transformCircular = createTransform(
  (inboundState, key) => stringify(inboundState),
  (outboundState, key) => parse(outboundState)
);

const callpersistConfig = {
  key: "call",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  transforms: [transformCircular],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  myconver: persistReducer(converPersistConfig, converReducer),
  messConver: persistReducer(messagePersistConfig, messageReducer),
  dialog: createPostDialogReducer,
  changePost: ChangePostDialogReducer,
  fileConver: persistReducer(filePersistConfig, fileReducer),
  mediaConver: persistReducer(MediaPersistConfig, mediaReducer),
  windowCall: persistReducer(callpersistConfig, CallReducer),
});

export default persistReducer(rootPersistConfig, rootReducer);
