import * as types from "./../constants/ActionTypes";
import v4 from 'uuid/v4';


export const nextLyric = (currentSongId) => ({
  type: types.NEXT_LYRIC,
  currentSongId
});
export const restartSong = (currentSongId) => ({
  type: types.RESTART_SONG,
  currentSongId
});
export const changeSong = (newSelectedSongId) => ({
  type: types.CHANGE_SONG,
  newSelectedSongId
});
export const requestSong = (title, localSongId) => ({
  type: types.REQUEST_SONG,
  title,
  songId: localSongId
});
export function fetchSongId(title) {
  return function (dispatch) {
    const localSongId = v4();
    dispatch(requestSong(title, localSongId));
    title = title.replace(' ', '_');
    return fetch('https://api.musixmatch.com/ws/1.1/track.search?&q_track=' + title + '&page_size=1&s_track_rating=desc&apikey=e1954d3468ed4493c255a62c40ddcc1f').then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    ).then(function(json) {
      console.log('CHECK OUT THIS SWEET API RESPONSE:', json)
    });
  };
}
