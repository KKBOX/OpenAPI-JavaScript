import { NEW_HITS_PLAYLISTS as ENDPOINT } from '../Endpoint';
import Fetcher from './Fetcher';

/**
 * List new hits playlists.
 * @see https://docs-en.kkbox.codes/v1.1/reference#new-hits-playlists
 */
export default class NewHitsPlaylistFetcher extends Fetcher {
  /**
   * @ignore
   */
  constructor(http, territory = 'TW') {
    super(http, territory);

    /**
     * @ignore
     */
    this.playlistID = undefined;
  }

  /**
   * Fetch all new hits playlists.
   *
   * @param {number} [limit] - The size of one page.
   * @param {number} [offset] - The offset index for first element.
   * @return {Promise}
   * @example api.newHitsPlaylistFetcher.fetchAllNewHitsPlaylists();
   * @see https://docs-en.kkbox.codes/v1.1/reference#newhitsplaylists
   */
  fetchAllNewHitsPlaylists(limit = undefined, offset = undefined) {
    return this.http.get(ENDPOINT, {
      territory: this.territory
    });
  }

  /**
   * Init the new hits playlist fetcher.
   *
   * @param {string} playlistID - The playlist ID.
   * @return {NewHitsPlaylistFetcher}
   * @see https://docs-en.kkbox.codes/v1.1/reference#newhitsplaylists-playlist_id
   */
  setPlaylistID(playlistID) {
    this.playlistID = playlistID;
    return this;
  }

  /**
   * Fetch metadata of the new hits playlist you set.
   *
   * @return {Promise}
   * @example api.newHitsPlaylistFetcher.setPlaylistID('DZrC8m29ciOFY2JAm3').fetchMetadata();
   * @see https://docs-en.kkbox.codes/v1.1/reference#newhitsplaylists-playlist_id
   */
  fetchMetadata() {
    return this.http.get(ENDPOINT + '/' + this.playlistID, {
      territory: this.territory
    });
  }

  /**
   * Fetch tracks of the new hits playlist you set. Result will be paged.
   *
   * @param {number} [limit] - The size of one page.
   * @param {number} [offset] - The offset index for first element.
   * @return {Promise}
   * @example api.newHitsPlaylistFetcher.setPlaylistID('DZrC8m29ciOFY2JAm3').fetchTracks();
   * @see https://docs-en.kkbox.codes/v1.1/reference#newhitsplaylists-playlist_id-tracks
   */
  fetchTracks(limit = undefined, offset = undefined) {
    return this.http.get(ENDPOINT + '/' + this.playlistID + '/tracks', {
      territory: this.territory,
      limit: limit,
      offset: offset
    });
  }
}
