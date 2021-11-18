import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { authReducer } from "../reducers/authReducer";

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

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  // post: postReducer
  // testReducer,
  //Them reducer
});

export default persistReducer(rootPersistConfig, rootReducer);
