import appConstants from '../../constants/app';

export default (state, action) => {
  switch (action.type) {
    case appConstants.SHOW_LOADER:
      return state.set('loaderVisibility', true);
    case appConstants.HIDE_LOADER:
      return state.set('loaderVisibility', false);
    default:
      return state;
  }
};
