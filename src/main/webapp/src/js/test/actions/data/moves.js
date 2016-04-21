import { expect } from 'chai';
import * as actions from '../../../app/actions/data/moves';
import constantsApp from '../../../app/constants/app';
import constants from '../../../app/constants/data';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import Immutable from 'immutable';
import defaultState from '../../../app/store/default';
import { apiBaseURL } from '../../../app/config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  describe('#data#moves', () => {
    it('should create an action, fetch request', () => {
      const expectedAction = {
        type: constants.FETCH_DATA_MOVES_REQUEST,
      };
      expect(actions.fetchDataRequest()).to.deep.equal(expectedAction);
    });

    it('should create an action, fetch success', () => {
      const data = {
        someVar: 'someData',
      };
      const expectedAction = {
        type: constants.FETCH_DATA_MOVES_SUCCESS,
        data,
      };
      expect(actions.fetchDataSuccess(data)).to.deep.equal(expectedAction);
    });

    it('should create an action, move request', () => {
      const expectedAction = {
        type: constants.MOVE_REQUEST,
      };
      expect(actions.moveRequest()).to.deep.equal(expectedAction);
    });

    it('should create an action, move success', () => {
      const data = {
        someVar: 'someData',
      };
      const expectedAction = {
        type: constants.MOVE_SUCCESS,
        data,
      };
      expect(actions.moveSuccess(data)).to.deep.equal(expectedAction);
    });
  });

  describe('#data#moves#Async', () => {
    it('creates FETCH_DATA_MOVES_SUCCESS when fetching moves has been done', () => {
      nock(`${apiBaseURL}/chess`)
        .get('/moves')
        .reply(200, [{
          origin: 'b2',
          destination: 'b4',
        }]
      );

      const expectedActions = [
        { type: constants.FETCH_DATA_MOVES_REQUEST },
        { type: constantsApp.SHOW_LOADER },
        { type: constantsApp.HIDE_LOADER },
        { type: constants.FETCH_DATA_MOVES_SUCCESS,
          data: [{
            origin: 'b2',
            destination: 'b4',
          }],
        },
      ];

      const store = mockStore(
        Immutable.fromJS(defaultState)
      );

      return store.dispatch(actions.fetchData())
        .then(() => { // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
  });
});
