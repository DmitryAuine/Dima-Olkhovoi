import dataConstants from '../../constants/data';

export default (state, { type, data }) => {
  switch (type) {
    case dataConstants.FETCH_DATA_REQUEST:
    case dataConstants.FETCH_DATA_MOVES_REQUEST:
      return state.set('isFetching', true);
    case dataConstants.FETCH_DATA_SUCCESS:
      return state.merge({
        isFetching: false,
        ...data,
      });
    case dataConstants.FETCH_DATA_MOVES_SUCCESS:
      return state.merge({
        isFetching: false,
        moves: data,
      });
    case dataConstants.PREPARE_NEW_GAME:
      return state.merge({
        selectSquare: null,
        moves: [],
      });
    case dataConstants.SET_SELECTED_SQUARE:
      return state.set('selectedSquare', data);
    default:
      return state;
  }
};
