import LogRocket from 'logrocket';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ConnectedRouter } from 'connected-react-router/immutable'
import { Provider } from 'react-redux'
import { configureStore } from './redux/index.js'
import withTracker from './components/withTracker';
import { Route } from "react-router-dom";
import { createBrowserHistory } from "history";

// setup error logging
LogRocket.init('dghlyl/techinternschool');

var history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route component={withTracker(App)} />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
