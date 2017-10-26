import {FEATURED_PLAYLISTS_CATEGORIES as ENDPOINT} from '../Endpoint'
import Fetcher from './Fetcher'

/**
 * List featured playlist categories.
 * @see https://kkbox.gelato.io/docs/versions/v1.1/resources/featured-playlist-categories
 */
export default class FeaturedPlaylistCategoryFetcher extends Fetcher {
    /**
     * @ignore
     */
    constructor(http, territory = 'TW') {
        super(http, territory)

        /**
         * @ignore
         */
        this.category_id = undefined
    }

    /**
     * Fetch all featured playlist categories.
     *
     * @return {Promise}
     * @example api.featuredPlaylistCategoryFetcher.fetchAllFeaturedPlaylistCategories()
     * @see https://kkbox.gelato.io/docs/versions/v1.1/resources/featured-playlist-categories/endpoints/get-featured-playlist-categories
     */
    fetchAllFeaturedPlaylistCategories() {
        return this.http.get(ENDPOINT, {territory: this.territory})
    }

    /**
     * Init the featured playlist category fetcher.
     *
     * @param {string} category_id - The category ID.
     * @return {FeaturedPlaylistCategoryFetcher}
     * @see https://kkbox.gelato.io/docs/versions/v1.1/resources/featured-playlist-categories/endpoints/get-featured-playlist-categories-category_id
     */
    setCategoryID(category_id) {
        this.category_id = category_id        
        return this
    }

    /**
     * Fetch metadata of the category you init.
     *
     * @return {Promise}
     * @example api.featuredPlaylistCategoryFetcher.setCategoryID('LXUR688EBKRRZydAWb').fetchMetadata()
     * @see https://kkbox.gelato.io/docs/versions/v1.1/resources/featured-playlist-categories/endpoints/get-featured-playlist-categories-category_id
     */
    fetchMetadata() {
        return this.http.get(ENDPOINT + this.category_id, {territory: this.territory})
    }

    /**
     * Fetch featured playlists of the category with the category fetcher you init. Result will be paged.
     *
     * @param {number} [limit] - The size of one page.
     * @param {number} [offset] - The offset index for first element.
     * @return {Promise}
     * @example api.featuredPlaylistCategoryFetcher.setCategoryID('LXUR688EBKRRZydAWb').fetchPlaylists()
     * @see https://kkbox.gelato.io/docs/versions/v1.1/resources/featured-playlist-categories/endpoints/get-featured-playlist-categories-category_id-playlists
     */
    fetchPlaylists(limit = undefined, offset = undefined) {
        return this.http.get(ENDPOINT + this.category_id + '/playlists', {
            territory: this.territory,
            limit: limit,
            offset: offset
        })
    }
}