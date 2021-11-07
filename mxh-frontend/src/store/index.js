import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../rootReducer";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
const persistor = persistStore(store);

export { persistor, store };
