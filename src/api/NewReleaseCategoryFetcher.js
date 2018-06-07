import { NEW_RELEASE_CATEGORIES as ENDPOINT } from '../Endpoint'
import Fetcher from './Fetcher'

/**
 * List categories of new release albums.
 * @see https://docs-en.kkbox.codes/v1.1/reference#new-release-categories
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
        this.categoryID = undefined
    }

    /**
     * Fetch all new release categories.
     *
     * @param {number} [limit] - The size of one page.
     * @param {number} [offset] - The offset index for first element.
     * @return {Promise}
     * @example api.newReleaseCategoryFetcher.fetchAllNewReleaseCategories()
     * @see https://docs-en.kkbox.codes/v1.1/reference#newreleasecategories
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
     * @param {string} categoryID - The category ID.
     * @return {NewReleaseCategoryFetcher}
     * @see https://docs-en.kkbox.codes/v1.1/reference#newreleasecategories-category_id
     */
    setCategoryID(categoryID) {
        this.categoryID = categoryID
        return this
    }

    /**
     * Fetch metadata of the new release category you set.
     *
     * @return {Promise}
     * @example api.newReleaseCategoryFetcher.setCategoryID('Cng5IUIQhxb8w1cbsz').fetchMetadata()
     * @see https://docs-en.kkbox.codes/v1.1/reference#newreleasecategories-category_id
     */
    fetchMetadata() {
        return this.http.get(ENDPOINT + '/' + this.categoryID, {
            territory: this.territory
        })
    }

    /**
     * Fetch albums of the new release category with the category fetcher you init. Result will be paged.
     *
     * @param {number} [limit] - The size of one page.
     * @param {number} [offset] - The offset index for first element.
     * @return {Promise}
     * @example api.newReleaseCategoryFetcher.setCategoryID('Cng5IUIQhxb8w1cbsz').fetchAlbums()
     * @see https://docs-en.kkbox.codes/v1.1/reference#newreleasecategories-category_id-albums
     */
    fetchAlbums(limit = undefined, offset = undefined) {
        return this.http.get(ENDPOINT + '/' + this.categoryID + '/albums', {
            territory: this.territory,
            limit: limit,
            offset: offset
        })
    }
}
