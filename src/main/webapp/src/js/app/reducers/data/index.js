import appConstants from '../../constants/app';

export default (state, { type, data }) => {
  switch (type) {
    case appConstants.FETCH_NOTIFICATIONS_REQUEST:
      return state.set('isFetching', true);
    case appConstants.FETCH_NOTIFICATIONS_SUCCESS:
      return state.merge({
        isFetching: false,
        data,
      });
    default:
      return state;
  }
};
