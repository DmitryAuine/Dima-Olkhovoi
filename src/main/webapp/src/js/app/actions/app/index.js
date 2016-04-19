import appConstants from '../../constants/app';

export const showLoader = () => ({
  type: appConstants.SHOW_LOADER,
});

export const hideLoader = () => ({
  type: appConstants.HIDE_LOADER,
});
