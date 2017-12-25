import {FEATURED_PLAYLISTS as ENDPOINT} from '../Endpoint'
import Fetcher from './Fetcher'

/**
 * List all featured playlists.
 * @see https://docs-en.kkbox.codes/v1.1/reference#featured-playlists
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
     * @see https://docs-en.kkbox.codes/v1.1/reference#featuredplaylists
     */
    fetchAllFeaturedPlaylists(limit = undefined, offset = undefined) {
        return this.http.get(ENDPOINT, {
            limit: limit, 
            offset: offset, 
            territory: this.territory
        })
    }
}