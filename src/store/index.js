// import { createStore, applyMiddleware, compose } from "redux"
// import createSagaMiddleware from "redux-saga"

// import rootReducer from "./reducers"
// import rootSaga from "./sagas"

// const sagaMiddleware = createSagaMiddleware()
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(sagaMiddleware))
// )
// sagaMiddleware.run(rootSaga)

// export default store


import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import createDebounce from "redux-debounced"
import thunk from "redux-thunk"
import rootReducer from "./reducers";
import rootSaga from "./sagas";

// const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, createDebounce()]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,

  composeEnhancers(applyMiddleware(...middlewares)),
  // window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_(),
);
// sagaMiddleware.run(rootSaga);

export default store;

