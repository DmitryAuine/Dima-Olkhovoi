// import { combineReducers } from 'redux';
import { combineReducers } from 'redux-immutable';

import app from './app';
import data from './data';

export default combineReducers({
  app,
  data,
});
