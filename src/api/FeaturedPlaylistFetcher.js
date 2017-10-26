import {FEATURED_PLAYLISTS as ENDPOINT} from '../Endpoint'
import Fetcher from './Fetcher'

/**
 * List all featured playlists.
 * @see https://kkbox.gelato.io/docs/versions/v1.1/resources/featured-playlists
 */
export default class FeaturedPlaylistFetcher extends Fetcher {
    /**
     * @ignore
     */
    constructor(http, territory = 'TW') {
        super(http, territory)
    }

    /**
     * Fetch all featured playlists. Result will be paged.
     *
     * @param {number} [limit] - The size for one page.
     * @param {number} [offset] - The offset index for first element.
     * @return {Promise}
     * @example api.featuredPlaylistFetcher.fetchAllFeaturedPlaylists()
     * @see https://kkbox.gelato.io/docs/versions/v1.1/resources/featured-playlists/endpoints/get-featured-playlists
     */
    fetchAllFeaturedPlaylists(limit = undefined, offset = undefined) {
        return this.http.get(ENDPOINT, {
            limit: limit, 
            offset: offset, 
            territory: this.territory
        })
    }
}