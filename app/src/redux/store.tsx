import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { RootReducer } from "./reducers";
import RootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(RootReducer, applyMiddleware(...middleware));

export type RootState = ReturnType<typeof RootReducer>;

sagaMiddleware.run(RootSaga);
export default store;
