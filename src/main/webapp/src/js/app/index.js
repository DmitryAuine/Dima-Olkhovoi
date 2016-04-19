import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
import bootstrapStyles from 'bootstrap/dist/css/bootstrap.min.css';
import fontAwesomeStyles from 'font-awesome/css/font-awesome.min.css';

import configureStore from './store/configureStore';
import defaultState from './store/default';

import App from './components/App';

// const defaultState = new Immutable.Map();

const store = configureStore(Immutable.fromJS(defaultState));
// const store = configureStore(Immutable.fromJS(offlineState));

render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);

store.subscribe(() => {
  console.log(store.getState());
});
