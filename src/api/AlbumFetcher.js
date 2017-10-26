import {ALBUMS as ENDPOINT} from '../Endpoint'
import Fetcher from './Fetcher'

/**
 * Fetch metadata and tracks of a album.
 * @see https://kkbox.gelato.io/docs/versions/v1.1/resources/albums
 */
export default class AlbumFetcher extends Fetcher {    
    /**
     * @ignore
     */
    constructor(http, territory = 'TW') {
        super(http, territory)

        /**
         * @ignore
         */
        this.album_id = undefined
    }

    /**
     * Set the album fetcher.
     *
     * @param {string} album_id - The ID of an album.
     * @return {AlbumFetcher}
     * @see https://kkbox.gelato.io/docs/versions/v1.1/resources/albums/endpoints/get-albums-album_id
     */
    setAlbumID(album_id) {
        this.album_id = album_id        
        return this
    }

    /**
     * Fetcy metadata of the album you create.
     *
     * @return {Promise}
     * @example api.albumFetcher.setAlbumID('KmRKnW5qmUrTnGRuxF').fetchMetadata()
     * @see https://kkbox.gelato.io/docs/versions/v1.1/resources/albums/endpoints/get-albums-album_id
     */
    fetchMetadata() {
        return this.http.get(ENDPOINT + this.album_id, {territory: this.territory})
    }

    /**
     * Get KKBOX web widget uri of the album.
     * @example https://widget.kkbox.com/v1/?id=4qtXcj31wYJTRZbb23&type=album
     * @return {string}
     */
    getWidgetUri(){
        return `https://widget.kkbox.com/v1/?id=${this.album_id}&type=album`
    }

    /**
     * Get tracks in an album. Result will be return with pagination.
     *
     * @param {number} [limit] - The size for one page.
     * @param {number} [offset] - The offset index for first element.
     * @return {Promise}
     * @example api.albumFetcher.setAlbumID('KmRKnW5qmUrTnGRuxF').fetchTracks()
     * @see https://kkbox.gelato.io/docs/versions/v1.1/resources/albums/endpoints/get-albums-album_id-tracks
     */
    fetchTracks(limit = undefined, offset = undefined) {
        return this.http.get(ENDPOINT + this.album_id + '/tracks', {
            territory: this.territory,
            limit: limit,
            offset: offset
        })
    }
}