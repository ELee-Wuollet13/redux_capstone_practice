import { combineReducers } from 'redux';
import suitChangeReducer from './suitChangeReducer';
import lyricChangeReducer from './lyricChangeReducer';

const rootReducer = combineReducers({
  currentSuitId: suitChangeReducer,
  suitsById: lyricChangeReducer
});

export default rootReducer;
