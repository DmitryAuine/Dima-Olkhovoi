import { setSelectedSquare } from './data';
import { fetchMovesIfNeeded } from './moves';

export const selectSquare = (data) => (dispatch) => {
  dispatch(setSelectedSquare(data));
  dispatch(fetchMovesIfNeeded());

  return Promise.resolve();
};
