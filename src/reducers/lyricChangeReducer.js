import constants from './../constants';
const { initialState, types } = constants;

const lyricChangeReducer = (state = initialState.suitsById, action) => {
  let newSuitsByIdEntry;
  let newSuitsByIdStateSlice;
  switch (action.type) {

    case types.NEXT_LYRIC:
    const newArrayPosition = state[action.currentSuitId].arrayPosition + 1;
    newSuitsByIdEntry = Object.assign({}, state[action.currentSuitId], {
      arrayPosition: newArrayPosition
    });
    newSuitsByIdStateSlice = Object.assign({}, state, {
      [action.currentSuitId]: newSuitsByIdEntry
    });
    return newSuitsByIdStateSlice;

    case types.RESTART_SUIT:
    newSuitsByIdEntry = Object.assign({}, state[action.currentSuitId], {
      arrayPosition: 0
    });
    newSuitsByIdStateSlice = Object.assign({}, state, {
      [action.currentSuitId]: newSuitsByIdEntry
    });
    return newSuitsByIdStateSlice;

    case types.REQUEST_SUIT:
    newSuitsByIdEntry = {
      isFetching: true,
      title: action.title,
      suitId: action.suitId
    };
    newSuitsByIdStateSlice = Object.assign({}, state, {
      [action.suitId]: newSuitsByIdEntry
    });
    return newSuitsByIdStateSlice;

    case types.RECEIVE_SUIT:
  newSuitsByIdEntry = Object.assign({}, state[action.suitId], {
    isFetching: false,
    receivedAt: action.receivedAt,
    title: action.title,
    artist: action.artist,
    suitArray: action.suitArray,
    arrayPosition: 0,
    suitId: action.suitId
  });
  newSuitsByIdStateSlice = Object.assign({}, state, {
    [action.suitId]: newSuitsByIdEntry
  });
  return newSuitsByIdStateSlice;

    default:
    return state;
  }
};

export default lyricChangeReducer;
