import constants from "./../../src/constants";
import suitChangeReducer from './../../src/reducers/suitChangeReducer';
import lyricChangeReducer from './../../src/reducers/lyricChangeReducer';
import rootReducer from './../../src/reducers/';
import { createStore } from 'redux';
import * as actions from './../../src/actions';

describe('Karaoke App', () => {
  const { initialState, types } = constants;
  const store = createStore(rootReducer, initialState);

  describe('lyricChangeReducer', () => {
    it('Should accept and return initial state.', () => {
      expect(lyricChangeReducer(initialState.suitsById, { type: null })).toEqual(initialState.suitsById);
    });
    it('Should update currently-displayed lyric of suit', () => {
      expect(lyricChangeReducer(initialState.suitsById, actions.nextLyric(2))[2].arrayPosition).toEqual(initialState.suitsById[2].arrayPosition + 1);
    });
    it('Should update currently-displayed lyric of suit', () => {
      expect(lyricChangeReducer(initialState.suitsById, { type: 'NEXT_LYRIC', currentSuitId: 2 })[2].arrayPosition).toEqual(initialState.suitsById[2].arrayPosition + 1);
    });

    it('Should restart suit', () => {
      expect(lyricChangeReducer(initialState.suitsById, { type: 'RESTART_SUIT', currentSuitId: 1 })[1].arrayPosition).toEqual(0);
    });
    it('Should restart suit', () => {
      expect(lyricChangeReducer(initialState.suitsById, actions.restartSuit(1))[1].arrayPosition).toEqual(0);
    });
    it('Should update state when API lyrics are being requested.', () => {
      const action = actions.requestSuit('crocodile rock');
      const newStateEntry = {
        isFetching: true,
        title: action.title,
        suitId: action.suitId,
      };
      expect(lyricChangeReducer(initialState.suitsById, action)[action.suitId])
      .toEqual(newStateEntry);
      it('Update state on receive suit', () => {
        const action = actions.receiveSuit('kiss', 'prince', 1, ['you don\'t have to be beautiful', 'to turn me on']);
        const newObject = {
          isFetching: false,
          title: action.title,
          artist: action.artist,
          suitId: action.suitId,
          receivedAt: action.receivedAt,
          suitArray: action.suitArray,
          arrayPosition: 0
        };
        expect(lyricChangeReducer(initialState.suitsById, action)[action.suitId])
        .toEqual(newObject);
      });
    });

  });

  describe('suitChangeReducer', () => {
    it('Should accept and return initial state.', () => {
      expect(suitChangeReducer(initialState, { type: null })).toEqual(initialState);
    });

    it('Should change selectedSuit.', () => {
      expect(suitChangeReducer(initialState, { type: 'CHANGE_SUIT', newSelectedSuitId: 1 })).toEqual(1);
    });
    it('Should change selectedSuit.', () => {
      expect(suitChangeReducer(initialState.currentSuitId, actions.changeSuit(2))).toEqual(2);
    });
  });

  describe('rootReducer', () => {
    it('Should accept and return initial state.', () => {
      expect(rootReducer(initialState, { type: null })).toEqual(initialState);
    });

    it('Should contain logic from both reducers.', () => {
      expect(store.getState().currentSuitId).toEqual(suitChangeReducer(undefined, { type: null }));
      expect(store.getState().suitsById).toEqual(lyricChangeReducer(undefined, { type: null }));
    });
  });

});
