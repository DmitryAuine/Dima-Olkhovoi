import request from 'superagent';
import dataConstants from '../../constants/data';
import { showLoader, hideLoader } from '../app';
import { apiBaseURL } from '../../config';

export const fetchDataRequest = () => ({
  type: dataConstants.FETCH_DATA_MOVES_REQUEST,
});

export const fetchDataSuccess = (data) => ({
  type: dataConstants.FETCH_DATA_MOVES_SUCCESS,
  data,
});

export const moveRequest = () => ({
  type: dataConstants.MOVE_REQUEST,
});

export const moveSuccess = (data) => ({
  type: dataConstants.MOVE_SUCCESS,
  data,
});

export const fetchDataFailure = () => ({
  // type: dataConstants.SHOW_ERROR,
  // message: 'data.fetch.error',
});

export const moveFailure = () => ({
  // type: dataConstants.SHOW_ERROR,
  // message: 'data.fetch.error',
});

const fetchData = () => dispatch => {
  dispatch(fetchDataRequest());
  dispatch(showLoader());

  return request.get(`${apiBaseURL}/chess/moves`)
    // .set('Accept', 'application/json')
    // .set('Content-Type', 'application/json')
    .withCredentials()
    .end((err, res) => {
      dispatch(hideLoader());
      if (err) {
        dispatch(fetchDataFailure());
      } else {
        dispatch(fetchDataSuccess(res.body));
      }
    });
};

const move = (from, to) => dispatch => {
  dispatch(moveRequest());
  dispatch(showLoader());

  return request.post(`${apiBaseURL}/chess/moves`)
    // .set('Accept', 'application/json')
    // .set('Content-Type', 'application/json')
    .send({ origin: from, destination: to })
    .withCredentials()
    .end((err, res) => {
      dispatch(hideLoader());
      if (err) {
        dispatch(moveFailure());
      } else {
        dispatch(moveSuccess(res.body));
      }
    });
};

const shouldFetchMoves = (state) => {
  const data = state.getIn(['data', 'moves']);

  if (!data.size) {
    return true;
  }

  if (data.get('isFetching')) {
    return false;
  }

  return false;
};

export const fetchMovesIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchMoves(getState())) {
    return dispatch(fetchData());
  }

  return Promise.resolve();
};

export const doMove = (from, to) => (dispatch) => dispatch(move(from, to));
