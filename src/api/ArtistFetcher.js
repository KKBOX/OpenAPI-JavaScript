import {ARTISTS as ENDPOINT} from '../Endpoint'
import Fetcher from './Fetcher'

/**
 * Get artist metadata.
 * @see https://kkbox.gelato.io/docs/versions/v1.1/resources/artists
 */
export default class ArtistFetcher extends Fetcher {
    /**
     * @ignore
     */
    constructor(http, territory = 'TW') {
        super(http, territory)

        /**
         * @ignore
         */
        this.artist_id = undefined
    }

    /**
     * Init the artist object.
     *
     * @param {string} artist_id - The ID of an artist.
     * @return {Artist}
     * @see https://kkbox.gelato.io/docs/versions/v1.1/resources/artists/endpoints/get-artists-artist_id
     */
    setArtistID(artist_id) {
        this.artist_id = artist_id
        return this
    }

    /**
     * Fetch metadata of the artist you find.
     *
     * @return {Promise}
     * @example api.artistFetcher.setArtistID('Cnv_K6i5Ft4y41SxLy').fetchMetadata()
     * @see https://kkbox.gelato.io/docs/versions/v1.1/resources/artists/endpoints/get-artists-artist_id
     */
    fetchMetadata() {
        return this.http.get(ENDPOINT + this.artist_id, {territory: this.territory})
    }

    /**
     * Fetch albums belong to an artist.
     *
     * @param {number} [limit] - The size for one page.
     * @param {number} [offset] - The offset index for first element.
     * @return {Promise}
     * @example api.artistFetcher.setArtistID('Cnv_K6i5Ft4y41SxLy').fetchAlbums()
     * @see https://kkbox.gelato.io/docs/versions/v1.1/resources/artists/endpoints/get-artists-artist_id-albums
     */
    fetchAlbums(limit = undefined, offset = undefined) {
        return this.http.get(ENDPOINT + this.artist_id + '/albums', {
            territory: this.territory,
            limit: limit,
            offset: offset
        })
    }

    /**
     * Fetch top tracks belong to an artist.
     *
     * @param {number} [limit] - The size for one page.
     * @param {number} [offset] - The offset index for first element.
     * @return {Promise}
     * @example api.artistFetcher.setArtistID('Cnv_K6i5Ft4y41SxLy').fetchTopTracks()
     * @see https://kkbox.gelato.io/docs/versions/v1.1/resources/artists/endpoints/get-artists-artist_id-top-tracks
     */
    fetchTopTracks(limit = undefined, offset = undefined) {
        return this.http.get(ENDPOINT + this.artist_id + '/top-tracks', {
            territory: this.territory,
            limit: limit,
            offset: offset
        })
    }
}