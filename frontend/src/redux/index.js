import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router/immutable';
import { SET_USER, PROJECT_COMPLETE_CONSTANT, PROJECT_INCOMPLETE_CONSTANT, SET_CURIC_VERSION, MARK_PROJECT_COMPLETED, SET_CURRENT_PROJECT } from './actions';

let composeEnhancers = null;
if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
} else {
  composeEnhancers = compose;
}

export function configureStore(history) {
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
    learning: learningReducer,
    user: userReducer
  })

export function userReducer(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user
    default:
      return state
  }
}

export function handleProjectCompleted(index, completedProjects) {
  let projects = [...completedProjects]
  // handle case where projects is longer than current index
  if (projects.length > index) {
    projects[index] = PROJECT_COMPLETE_CONSTANT
  } else {
    while(projects.length < index) {
      projects.push(PROJECT_INCOMPLETE_CONSTANT)
    }
    projects.push(PROJECT_COMPLETE_CONSTANT)
  }
  return projects
}

export function learningReducer(state = {
  activeProject: 0, 
  completedProjects: [], 
  curicVersion: 1
}, action) {
  switch (action.type) {
    case SET_CURRENT_PROJECT:
      return {...state, activeProject: action.index}
    case MARK_PROJECT_COMPLETED:
      return {...state, completedProjects: handleProjectCompleted(action.index, state.completedProjects)}
    case SET_CURIC_VERSION:
      return {...state, curicVersion: action.version}
    default:
      return state
  }
}