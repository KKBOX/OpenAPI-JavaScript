import { FEATURED_PLAYLISTS_CATEGORIES as ENDPOINT } from '../Endpoint';
import Fetcher from './Fetcher';

/**
 * List featured playlist categories.
 * @see https://docs-en.kkbox.codes/v1.1/reference#featured-playlist-categories
 */
export default class FeaturedPlaylistCategoryFetcher extends Fetcher {
  /**
   * @ignore
   */
  constructor(http, territory = 'TW') {
    super(http, territory);

    /**
     * @ignore
     */
    this.categoryID = undefined;
  }

  /**
   * Fetch all featured playlist categories.
   *
   * @return {Promise}
   * @example api.featuredPlaylistCategoryFetcher.fetchAllFeaturedPlaylistCategories();
   * @see https://docs-en.kkbox.codes/v1.1/reference#featuredplaylistcategories
   */
  fetchAllFeaturedPlaylistCategories() {
    return this.http.get(ENDPOINT, {
      territory: this.territory
    });
  }

  /**
   * Init the featured playlist category fetcher.
   *
   * @param {string} categoryID - The category ID.
   * @return {FeaturedPlaylistCategoryFetcher}
   * @see https://docs-en.kkbox.codes/v1.1/reference#featuredplaylistcategories-category_id
   */
  setCategoryID(categoryID) {
    this.categoryID = categoryID;
    return this;
  }

  /**
   * Fetch metadata of the category you init.
   *
   * @return {Promise}
   * @example api.featuredPlaylistCategoryFetcher.setCategoryID('LXUR688EBKRRZydAWb').fetchMetadata();
   * @see https://docs-en.kkbox.codes/v1.1/reference#featuredplaylistcategories-category_id
   */
  fetchMetadata() {
    return this.http.get(ENDPOINT + '/' + this.categoryID, {
      territory: this.territory
    });
  }

  /**
   * Fetch featured playlists of the category with the category fetcher you init. Result will be paged.
   *
   * @param {number} [limit] - The size of one page.
   * @param {number} [offset] - The offset index for first element.
   * @return {Promise}
   * @example api.featuredPlaylistCategoryFetcher.setCategoryID('LXUR688EBKRRZydAWb').fetchPlaylists();
   * @see https://docs-en.kkbox.codes/v1.1/reference#featuredplaylistcategories-category_id-playlists
   */
  fetchPlaylists(limit = undefined, offset = undefined) {
    return this.http.get(ENDPOINT + '/' + this.categoryID + '/playlists', {
      territory: this.territory,
      limit: limit,
      offset: offset
    });
  }
}
