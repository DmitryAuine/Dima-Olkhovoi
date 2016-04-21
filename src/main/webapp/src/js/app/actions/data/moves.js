import dataConstants from '../../constants/data';
import { showLoader, hideLoader } from '../app';
import fetch from 'isomorphic-fetch';
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

export const fetchData = () => dispatch => {
  dispatch(fetchDataRequest());
  dispatch(showLoader());

  return fetch(`${apiBaseURL}/chess/moves`, {
    credentials: 'include',
  }).then(
      (response) => {
        dispatch(hideLoader());
        return response.json();
      }
    ).then(
      (json) => dispatch(fetchDataSuccess(json))
    ).catch(
      () => dispatch(fetchDataFailure())
    );
};

const move = (from, to) => dispatch => {
  dispatch(moveRequest());
  dispatch(showLoader());

  return fetch(`${apiBaseURL}/chess/moves`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      origin: from,
      destination: to,
    }),
  }).then(
      (response) => {
        dispatch(hideLoader());
        return response.json();
      }
    ).then(
      (json) => dispatch(moveSuccess(json))
    ).catch(
      () => dispatch(moveFailure())
    );
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
