import { GENRE_STATIONS as ENDPOINT } from '../Endpoint';
import Fetcher from './Fetcher';

/**
 * Get genre stations.
 * @see https://docs-en.kkbox.codes/v1.1/reference#genre-stations
 */
export default class GenreStationFetcher extends Fetcher {
  /**
   * @ignore
   */
  constructor(http, territory = 'TW') {
    super(http, territory);

    /**
     *  @ignore
     */
    this.genreStationID = undefined;
  }

  /**
   * Fetch all genre stations. The result will be paged.
   *
   * @param {number} [limit] - The size for one page.
   * @param {number} [offset] - The offset index for first element.
   * @return {Promise}
   * @example api.genreStationFetcher.fetchAllGenreStations();
   * @see https://docs-en.kkbox.codes/v1.1/reference#genrestations
   */
  fetchAllGenreStations(limit = undefined, offset = undefined) {
    return this.http.get(ENDPOINT, {
      territory: this.territory,
      limit: limit,
      offset: offset
    });
  }

  /**
   * Init the genre station fetcher.
   *
   * @param {string} genreStationID - The ID of a genre station.
   * @return {GenreStation}
   * @see https://docs-en.kkbox.codes/v1.1/reference#genrestations-station_id
   */
  setGenreStationID(genreStationID) {
    this.genreStationID = genreStationID;
    return this;
  }

  /**
   * Fetch metadata of the genre station with the genre station fetcher.
   *
   * @return {Promise}
   * @example api.genreStationFetcher.setGenreStationID('TYq3EHFTl-1EOvJM5Y').fetchMetadata();
   * @see https://docs-en.kkbox.codes/v1.1/reference#genrestations-station_id
   */
  fetchMetadata() {
    return this.http.get(ENDPOINT + '/' + this.genreStationID, {
      territory: this.territory
    });
  }
}
