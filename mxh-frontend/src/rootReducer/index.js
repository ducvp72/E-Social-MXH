import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { authReducer } from "../reducers/authReducer";

import { createPostDialogReducer } from "./../reducers/createPostDialog";
import { converReducer } from "./../reducers/converReducer";
import { notifyReducer } from "./../reducers/notificationReducer";
import { messageReducer } from "./../reducers/messageReducer";
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

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  myconver: persistReducer(converPersistConfig, converReducer),
  // mynotify: notifyReducer,
  messConver: persistReducer(messagePersistConfig, messageReducer),
  dialog: createPostDialogReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
