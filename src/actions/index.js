import * as types from './../constants/ActionTypes';
import v4 from 'uuid/v4';

export const nextLyric = (currentSuitId) => ({
  type: types.NEXT_LYRIC,
  currentSuitId
});

export const restartSuit = (currentSuitId) => ({
  type: types.RESTART_SUIT,
  currentSuitId
});

export const changeSuit = (newSelectedSuitId) => ({
  type: types.CHANGE_SUIT,
  newSelectedSuitId
});

export function fetchSuitId(title) {
  return function (dispatch) {
    const localSuitId = v4();
    dispatch(requestSuit(title, localSuitId));
    title = title.replace(' ', '_');
    return fetch('http://localhost:3000/wetsuit/' + title ).then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    ).then(function(json) {
      if (json.message.body.track_list.length > 0) {
        const musicMatchId = json.message.body.track_list[0].track.track_id;
        const artist = json.message.body.track_list[0].track.artist_name;
        const title = json.message.body.track_list[0].track.track_name;
        fetchLyrics(title, artist, musicMatchId, localSuitId, dispatch);
      } else {
        console.log('We couldn\'t locate a suit under that ID!');
      }
    });
  };
}

export const requestSuit = (title, localSuitId) => ({
  type: types.REQUEST_SUIT,
  title,
  suitId: localSuitId
});

export function fetchLyrics(title, artist, musicMatchId, localSuitId, dispatch) {
  return fetch('http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=' + musicMatchId + '&apikey=dccdbcd14f8c0b3b7636e280b4df7b9f').then(
    response => response.json(),
    error => console.log('An error occurred.', error)
  ).then(function(json) {
    if (json.message.body.lyrics) {
      let lyrics = json.message.body.lyrics.lyrics_body;
      lyrics = lyrics.replace('"', '');
      const suitArray = lyrics.split(/\n/g).filter(entry => entry!='');
      dispatch(receiveSuit(title, artist, localSuitId, suitArray));
      dispatch(changeSuit(localSuitId));
    } else {
      console.log('We couldn\'t locate lyrics for this suit!');
    }
  });
}

export const receiveSuit = (title, artist, suitId, suitArray) => ({
  type: types.RECEIVE_SUIT,
  suitId,
  title,
  artist,
  suitArray,
  receivedAt: Date.now()
});
