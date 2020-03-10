import constants from './../constants';
const { initialState, types } = constants;

const suitChangeReducer = (state = initialState.currentSuitId, action) => {
  switch (action.type) {
  case types.CHANGE_SUIT:
    return action.newSelectedSuitId;
  default:
    return state;
  }
};

export default suitChangeReducer;
