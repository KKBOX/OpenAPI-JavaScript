import {SHARED_PLAYLISTS as ENDPOINT} from '../Endpoint'
import Fetcher from './Fetcher'

/**
 * Get playlist metadata.
 * @see https://docs-en.kkbox.codes/v1.1/reference#shared-playlists
 */
export default class SharedPlaylistFetcher extends Fetcher {
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
     * Init the shared playlist fetcher.
     *
     * @param {string} playlist_id - The ID of a playlist.
     * @return {SharedPlaylistFetcher}
     * @see https://docs-en.kkbox.codes/v1.1/reference#sharedplaylists-playlist_id
     */
    setPlaylistID(playlist_id) {
        this.playlist_id = playlist_id
        return this
    }

    /**
     * Fetch metadata of the shared playlist with the shared playlist fetcher.
     *
     * @return {Promise}
     * @example api.sharedPlaylistFetcher.setPlaylistID('4nUZM-TY2aVxZ2xaA-').fetchMetadata()
     * @see https://docs-en.kkbox.codes/v1.1/reference#sharedplaylists-playlist_id
     */
    fetchMetadata() {
        return this.http.get(ENDPOINT + this.playlist_id, {territory: this.territory})
    }

    /**
     * Get KKBOX web widget uri of the playlist.
     * @example https://widget.kkbox.com/v1/?id=KmjwNXizu5MxHFSloP&type=playlist
     * @return {string}
     */
    getWidgetUri(){
        return `https://widget.kkbox.com/v1/?id=${this.playlist_id}&type=playlist`
    }

    /**
     * Fetch track list of a shared playlist.
     *
     * @param {number} [limit] - The size for one page.
     * @param {number} [offset] - The offset index for first element.
     * @return {Promise}
     * @example api.sharedPlaylistFetcher.setPlaylistID('4nUZM-TY2aVxZ2xaA-').fetchTracks()
     * @see https://docs-en.kkbox.codes/v1.1/reference#sharedplaylists-playlist_id-tracks
     */
    fetchTracks(limit = undefined, offset = undefined) {
        return this.http.get(ENDPOINT + this.playlist_id + '/tracks', {
            territory: this.territory,
            limit: limit,
            offset: offset
        })
    }
}