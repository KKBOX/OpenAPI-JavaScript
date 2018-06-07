import { SEARCH as ENDPOINT } from '../Endpoint';
import Fetcher from './Fetcher';

/**
 * Search API.
 * @see https://docs-en.kkbox.codes/v1.1/reference#search
 */
export default class SearchFetcher extends Fetcher {
  /**
   * @ignore
   */
  constructor(http, territory = 'TW') {
    super(http, territory);

    /**
     * @ignore
     */
    this.filterConditions = undefined;

    /**
     * @ignore
     */
    this.q = undefined;

    /**
     * @ignore
     */
    this.type = undefined;
  }

  /**
   * Filter what you don't want when search.
   *
   * @param {Object} [conditions] - search conditions.
   * @param {string} conditions.track - track's name.
   * @param {string} conditions.album - album's name.
   * @param {string} conditions.artist - artist's name.
   * @param {string} conditions.playlist - playlist's title.
   * @param {string} conditions.availableTerritory - tracks and albums available territory.
   * @return {Search}
   * @example
   * api.searchFetcher
   *  .setSearchCriteria('五月天 好好')
   *  .filter({artist: '五月天'})
   *  .fetchSearchResult();
   */
  filter(conditions = {}) {
    this.filterConditions = conditions;
    return this;
  }

  /**
   * Init the search fetcher for the artist, album, track or playlist.
   *
   * @param {string} q - The keyword to be searched.
   * @param {string} [type] - ['artist', 'album', 'track', 'playlist'] The type of search. Default to search all types. If you want to use multiple type at the same time, you may use ',' to separate them.
   * @return {Search}
   * @see https://docs-en.kkbox.codes/v1.1/reference#search_1
   */
  setSearchCriteria(q, type = undefined) {
    this.q = q;
    this.type = type;
    return this;
  }

  /**
   * Fetch the search result.
   *
   * @param {number} [limit] - The size of one page.
   * @param {number} [offset] - The offset index for first element.
   * @return {Promise}
   * @example
   * api.searchFetcher
   *  .setSearchCriteria('五月天 好好')
   *  .fetchSearchResult();
   * @see https://docs-en.kkbox.codes/v1.1/reference#search_1
   */
  fetchSearchResult(limit = undefined, offset = undefined) {
    return this.http
      .get(ENDPOINT, {
        q: this.q,
        type: this.type,
        territory: this.territory,
        limit: limit,
        offset: offset
      })
      .then(doFilter.bind(this));
  }
}

function doFilter(response) {
  if (this.filterConditions !== undefined) {
    const data = Object.keys(response.data).map(key => {
      switch (key) {
        case 'tracks':
          return {
            [key]: Object.assign(response.data[key], {
              data: response.data[key].data.filter(track => {
                if (
                  this.filterConditions.availableTerritory !== undefined &&
                  !track.available_territories.includes(
                    this.filterConditions.availableTerritory
                  )
                ) {
                  return false;
                }
                if (
                  this.filterConditions.track !== undefined &&
                  !new RegExp('.*' + this.filterConditions.track + '.*').test(
                    track.name
                  )
                ) {
                  return false;
                }
                if (
                  this.filterConditions.album !== undefined &&
                  !new RegExp('.*' + this.filterConditions.album + '.*').test(
                    track.album.name
                  )
                ) {
                  return false;
                }
                return !(
                  this.filterConditions.artist !== undefined &&
                  !new RegExp('.*' + this.filterConditions.artist + '.*').test(
                    track.album.artist.name
                  )
                );
              })
            })
          };
        case 'albums':
          return {
            [key]: Object.assign(response.data[key], {
              data: response.data[key].data.filter(album => {
                if (
                  this.filterConditions.availableTerritory !== undefined &&
                  !album.available_territories.includes(
                    this.filterConditions.availableTerritory
                  )
                ) {
                  return false;
                }
                if (
                  this.filterConditions.album !== undefined &&
                  !new RegExp('.*' + this.filterConditions.album + '.*').test(
                    album.name
                  )
                ) {
                  return false;
                }
                return !(
                  this.filterConditions.artist !== undefined &&
                  !new RegExp('.*' + this.filterConditions.artist + '.*').test(
                    album.artist.name
                  )
                );
              })
            })
          };
        case 'artists':
          return {
            [key]: Object.assign(response.data[key], {
              data: response.data[key].data.filter(artist => {
                if (this.filterConditions.artist === undefined) {
                  return true;
                } else {
                  return new RegExp(
                    '.*' + this.filterConditions.artist + '.*'
                  ).test(artist.name);
                }
              })
            })
          };
        case 'playlists':
          return {
            [key]: Object.assign(response.data[key], {
              data: response.data[key].data.filter(playlist => {
                if (this.filterConditions.playlist === undefined) {
                  return true;
                } else {
                  return new RegExp(
                    '.*' + this.filterConditions.playlist + '.*'
                  ).test(playlist.title);
                }
              })
            })
          };
        default:
          return {
            [key]: response.data[key]
          };
      }
    });
    return Object.assign(response, {
      data: Object.assign(...data)
    });
  } else {
    return response;
  }
}
