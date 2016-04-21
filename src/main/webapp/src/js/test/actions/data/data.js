import { expect } from 'chai';
import * as actions from '../../../app/actions/data/data'
import constants from '../../../app/constants/data'

describe('actions', () => {
  describe('#data#data', () => {
    it('should create an action, fetch request', () => {
      const expectedAction = {
        type: constants.FETCH_DATA_REQUEST,
      };
      expect(actions.fetchDataRequest()).to.deep.equal(expectedAction);
    });

    it('should create an action, fetch success', () => {
      const data = {
        someVar: 'someData',
      };
      const expectedAction = {
        type: constants.FETCH_DATA_SUCCESS,
        data,
      };
      expect(actions.fetchDataSuccess(data)).to.deep.equal(expectedAction);
    });

    it('should create an action to set selected square', () => {
      const data = 'a1';
      const expectedAction = {
        type: constants.SET_SELECTED_SQUARE,
        data,
      };
      expect(actions.setSelectedSquare(data)).to.deep.equal(expectedAction);
    });

    it('should create an action to prepare new game', () => {
      const expectedAction = {
        type: constants.PREPARE_NEW_GAME,
      };
      expect(actions.prepareNewGame()).to.deep.equal(expectedAction);
    });
  });
});
