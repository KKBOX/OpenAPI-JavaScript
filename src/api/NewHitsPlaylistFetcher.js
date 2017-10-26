import {NEW_HITS_PLAYLISTS as ENDPOINT} from '../Endpoint'
import Fetcher from './Fetcher'

/**
 * List new hits playlists.
 * @see https://kkbox.gelato.io/docs/versions/1.1/resources/new-hits-playlists
 */
export default class NewHitsPlaylistFetcher extends Fetcher {
    /**
     * @ignore
     */
    constructor(http, territory = 'TW') {
        super(http, territory)

        /**
         * @ignore
         */
        this.playlist_id = undefined
    }

    /**
     * Fetch all new hits playlists.
     *
     * @param {number} [limit] - The size of one page.
     * @param {number} [offset] - The offset index for first element.
     * @return {Promise}
     * @example api.newHitsPlaylistFetcher.fetchAllNewHitsPlaylists()
     * @see https://kkbox.gelato.io/docs/versions/1.1/resources/new-hits-playlists/endpoints/get-new-hits-playlists
     */
    fetchAllNewHitsPlaylists(limit = undefined, offset = undefined) {
        return this.http.get(ENDPOINT, {
            territory: this.territory
        })
    }

    /**
     * Init the new hits playlist fetcher.
     *
     * @param {string} playlist_id - The playlist ID.
     * @return {NewHitsPlaylistFetcher}
     * @see https://kkbox.gelato.io/docs/versions/1.1/resources/new-hits-playlists/endpoints/get-new-hits-playlists-playlist_id
     */
    setPlaylistID(playlist_id) {
        this.playlist_id = playlist_id        
        return this
    }

    /**
     * Fetch metadata of the new release category you set.
     *
     * @return {Promise}
     * @example api.newHitsPlaylistFetcher.setPlaylistID('DZrC8m29ciOFY2JAm3').fetchMetadata()
     * @see https://kkbox.gelato.io/docs/versions/1.1/resources/new-hits-playlists/endpoints/get-new-hits-playlists-playlist_id
     */
    fetchMetadata() {
        return this.http.get(ENDPOINT + this.playlist_id, {territory: this.territory})
    }
}