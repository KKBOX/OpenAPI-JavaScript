import { ARTISTS as ENDPOINT } from '../Endpoint';
import Fetcher from './Fetcher';

/**
 * Get artist metadata.
 * @see https://docs-en.kkbox.codes/v1.1/reference#artists
 */
export default class ArtistFetcher extends Fetcher {
  /**
   * @ignore
   */
  constructor(http, territory = 'TW') {
    super(http, territory);

    /**
     * @ignore
     */
    this.artistID = undefined;
  }

  /**
   * Init the artist object.
   *
   * @param {string} artistID - The ID of an artist.
   * @return {Artist}
   * @see https://docs-en.kkbox.codes/v1.1/reference#artists-artist_id
   */
  setArtistID(artistID) {
    this.artistID = artistID;
    return this;
  }

  /**
   * Fetch metadata of the artist you find.
   *
   * @return {Promise}
   * @example api.artistFetcher.setArtistID('Cnv_K6i5Ft4y41SxLy').fetchMetadata();
   * @see https://docs-en.kkbox.codes/v1.1/reference#artists-artist_id
   */
  fetchMetadata() {
    return this.http.get(ENDPOINT + '/' + this.artistID, {
      territory: this.territory
    });
  }

  /**
   * Fetch albums belong to an artist.
   *
   * @param {number} [limit] - The size for one page.
   * @param {number} [offset] - The offset index for first element.
   * @return {Promise}
   * @example api.artistFetcher.setArtistID('Cnv_K6i5Ft4y41SxLy').fetchAlbums();
   * @see https://docs-en.kkbox.codes/v1.1/reference#artists-artist_id-albums
   */
  fetchAlbums(limit = undefined, offset = undefined) {
    return this.http.get(ENDPOINT + '/' + this.artistID + '/albums', {
      territory: this.territory,
      limit: limit,
      offset: offset
    });
  }

  /**
   * Fetch top tracks belong to an artist.
   *
   * @param {number} [limit] - The size for one page.
   * @param {number} [offset] - The offset index for first element.
   * @return {Promise}
   * @example api.artistFetcher.setArtistID('Cnv_K6i5Ft4y41SxLy').fetchTopTracks();
   * @see https://docs-en.kkbox.codes/v1.1/reference#artists-artist_id-toptracks
   */
  fetchTopTracks(limit = undefined, offset = undefined) {
    return this.http.get(ENDPOINT + '/' + this.artistID + '/top-tracks', {
      territory: this.territory,
      limit: limit,
      offset: offset
    });
  }

  /**
   * Fetch related artists
   *
   * @param {number} [limit] - The size for one page.
   * @param {number} [offset] - The offset index for first element.
   * @return {Promise}
   * @example api.artistFetcher.setArtistID('Cnv_K6i5Ft4y41SxLy').fetchRelatedArtists();
   * @see https://docs-en.kkbox.codes/v1.1/reference#artists-artist_id-relatedartists
   */
  fetchRelatedArtists(limit = undefined, offset = undefined) {
    return this.http.get(ENDPOINT + '/' + this.artistID + '/related-artists', {
      territory: this.territory,
      limit: limit,
      offset: offset
    });
  }
}
