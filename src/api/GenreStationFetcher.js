import {GENRE_STATIONS as ENDPOINT} from '../Endpoint'
import Fetcher from './Fetcher'

/**
 * Get genre stations.
 * @see https://kkbox.gelato.io/docs/versions/v1.1/resources/genre-stations
 */
export default class GenreStationFetcher extends Fetcher {
    /**
     * @ignore
     */
    constructor(http, territory = 'TW') {
        super(http, territory)

        /**
         *  @ignore
         */
        this.genre_station_id = undefined 
    }

    /**
     * Fetch all genre stations. The result will be paged.
     *
     * @param {number} [limit] - The size for one page.
     * @param {number} [offset] - The offset index for first element.
     * @return {Promise}
     * @example api.GenreStation.fetchAllGenreStations()
     * @see https://kkbox.gelato.io/docs/versions/v1.1/resources/genre-stations/endpoints/get-genre-stations
     */
    fetchAllGenreStations(limit = undefined, offset = undefined) {
        return this.http.get(ENDPOINT, {
            territory: this.territory,
            limit: limit,
            offset: offset            
        })
    }

    /**
     * Init the genre station fetcher.
     *
     * @param {string} genre_station_id - The ID of a genre station.
     * @return {GenreStation}
     * @see https://kkbox.gelato.io/docs/versions/v1.1/resources/genre-stations/endpoints/get-genre-stations-station_id
     */
    setGenreStationID(genre_station_id) {
        this.genre_station_id = genre_station_id        
        return this
    }

    /**
     * Fetch metadata of the genre station with the genre station fetcher.
     *
     * @return {Promise}
     * @example api.GenreStation.setGenreStationID('TYq3EHFTl-1EOvJM5Y').fetchMetadata()
     * @see https://kkbox.gelato.io/docs/versions/v1.1/resources/genre-stations/endpoints/get-genre-stations-station_id
     */
    fetchMetadata() {
        return this.http.get(ENDPOINT + this.genre_station_id, {territory: this.territory})
    }
}