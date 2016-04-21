import { expect } from 'chai';
import reducer from '../../app/reducers/app';
import constants from '../../app/constants/app';
import Immutable from 'immutable';
import defaultState from '../../app/store/default';

describe('reducers', () => {
  describe('#app', () => {
    it('should handle SHOW_LOADER', () => {
      expect(
        reducer(Immutable.fromJS(defaultState), {
          type: constants.SHOW_LOADER,
        }).get('loaderVisibility')
      ).to.equal(
        true
      );
    });
    it('should handle HIDE_LOADER', () => {
      expect(
        reducer(Immutable.fromJS(defaultState), {
          type: constants.HIDE_LOADER,
        }).get('loaderVisibility')
      ).to.equal(
        false
      );
    });
  });
});
