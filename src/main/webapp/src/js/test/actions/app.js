import { expect } from 'chai';
import * as actions from '../../app/actions/app'
import constants from '../../app/constants/app'

describe('actions', () => {
  describe('#app', () => {
    it('should create an action to show loader', () => {
      const expectedAction = {
        type: constants.SHOW_LOADER,
      };
      expect(actions.showLoader()).to.deep.equal(expectedAction);
    });

    it('should create an action to hide loader', () => {
      const expectedAction = {
        type: constants.HIDE_LOADER,
      };
      expect(actions.hideLoader()).to.deep.equal(expectedAction);
    });
  });
});
