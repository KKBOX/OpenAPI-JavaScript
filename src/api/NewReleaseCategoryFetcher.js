import {NEW_RELEASE_CATEGORIES as ENDPOINT} from '../Endpoint'
import Fetcher from './Fetcher'

/**
 * List categories of new release albums.
 * @see https://kkbox.gelato.io/docs/versions/1.1/resources/new-release-categories
 */
export default class NewReleaseCategoryFetcher extends Fetcher {
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
     * Fetch all new release categories.
     *
     * @param {number} [limit] - The size of one page.
     * @param {number} [offset] - The offset index for first element.
     * @return {Promise}
     * @example api.newReleaseCategoryFetcher.fetchAllNewReleaseCategories()
     * @see https://kkbox.gelato.io/docs/versions/1.1/resources/new-release-categories/endpoints/get-new-release-categories
     */
    fetchAllNewReleaseCategories(limit = undefined, offset = undefined) {
        return this.http.get(ENDPOINT, {
            limit: limit,
            offset: offset,
            territory: this.territory
        })
    }

    /**
     * Init the new release category fetcher.
     *
     * @param {string} category_id - The category ID.
     * @return {NewReleaseCategoryFetcher}
     * @see https://kkbox.gelato.io/docs/versions/1.1/resources/new-release-categories/endpoints/get-new-release-categories-category_id
     */
    setCategoryID(category_id) {
        this.category_id = category_id        
        return this
    }

    /**
     * Fetch metadata of the new release category you set.
     *
     * @return {Promise}
     * @example api.newReleaseCategoryFetcher.setCategoryID('Cng5IUIQhxb8w1cbsz').fetchMetadata()
     * @see https://kkbox.gelato.io/docs/versions/1.1/resources/new-release-categories/endpoints/get-new-release-categories-category_id
     */
    fetchMetadata() {
        return this.http.get(ENDPOINT + this.category_id, {territory: this.territory})
    }

    /**
     * Fetch albums of the new release category with the category fetcher you init. Result will be paged.
     *
     * @param {number} [limit] - The size of one page.
     * @param {number} [offset] - The offset index for first element.
     * @return {Promise}
     * @example api.newReleaseCategoryFetcher.setCategoryID('Cng5IUIQhxb8w1cbsz').fetchAlbums()
     * @see https://kkbox.gelato.io/docs/versions/1.1/resources/new-release-categories/endpoints/get-new-release-categories-category_id-albums
     */
    fetchAlbums(limit = undefined, offset = undefined) {
        return this.http.get(ENDPOINT + this.category_id + '/albums', {
            territory: this.territory,
            limit: limit,
            offset: offset
        })
    }
}