import request from 'superagent';
import dataConstants from '../../constants/data';
import { showLoader, hideLoader } from '../app';
import { apiBaseURL } from '../../config';

export const fetchDataRequest = () => ({
  type: dataConstants.FETCH_DATA_REQUEST,
});

export const fetchDataSuccess = (data) => ({
  type: dataConstants.FETCH_DATA_SUCCESS,
  data,
});

export const fetchDataFailure = () => ({
  // type: dataConstants.SHOW_ERROR,
  // message: 'data.fetch.error',
});

const fetchData = () => dispatch => {
  dispatch(fetchDataRequest());
  dispatch(showLoader());

  return request
    .get(`${apiBaseURL}/chess`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .end((err, res) => {
      dispatch(hideLoader());
      if (err) {
        dispatch(fetchDataFailure());
      } else {
        dispatch(fetchDataSuccess(res.body));
      }
    });
};

const shouldFetchData = (state) => {
  const data = state.getIn(['data']);
  if (!data.size) {
    return true;
  }

  if (data.get('isFetching')) {
    return false;
  }

  return false;
};

export const fetchDataIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchData(getState())) {
    return dispatch(fetchData());
  }

  return Promise.resolve();
};
