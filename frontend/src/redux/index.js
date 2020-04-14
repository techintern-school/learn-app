import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router/immutable';
import { SET_USER } from './actions';

let composeEnhancers = null;
if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
} else {
  composeEnhancers = compose;
}

export default function configureStore(history) {
  //Init middlewares
  const middlewares = [routerMiddleware(history)];

  //Init enhancer
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  //Store creation
  const store = createStore(
    rootReducer(history),
    {},
    enhancer
  );

  return store;
}

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
    user: userReducer
  })

export function userReducer(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return {...state, ...action.user}  
    default:
      return state
  }
}

export function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}