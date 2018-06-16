const API_DOMAIN = 'https://api.kkbox.com/v1.1/';
const OAUTH_DOMAIN = 'https://account.kkbox.com/oauth2/';

module.exports = {
  SEARCH: API_DOMAIN + 'search',
  TRACKS: API_DOMAIN + 'tracks',
  ARTISTS: API_DOMAIN + 'artists',
  ALBUMS: API_DOMAIN + 'albums',
  SHARED_PLAYLISTS: API_DOMAIN + 'shared-playlists',
  MOOD_STATIONS: API_DOMAIN + 'mood-stations',
  FEATURED_PLAYLISTS: API_DOMAIN + 'featured-playlists',
  FEATURED_PLAYLISTS_CATEGORIES: API_DOMAIN + 'featured-playlist-categories',
  NEW_RELEASE_CATEGORIES: API_DOMAIN + 'new-release-categories',
  NEW_HITS_PLAYLISTS: API_DOMAIN + 'new-hits-playlists',
  GENRE_STATIONS: API_DOMAIN + 'genre-stations',
  CHARTS: API_DOMAIN + 'charts',
  Token: OAUTH_DOMAIN + 'token/',
  Authorization: OAUTH_DOMAIN + 'authorize/'
};
