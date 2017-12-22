import {MOOD_STATIONS as ENDPOINT} from '../Endpoint'
import Fetcher from './Fetcher'

/**
 * Get mood stations.
 * @see https://docs-en.kkbox.codes/v1.1/reference#mood-stations
 */
export default class MoodStationFetcher extends Fetcher {
    /**
     * @ignore
     */
    constructor(http, territory = 'TW') {
        super(http, territory)

        /**
         * @ignore
         */
        this.mood_station_id = undefined
    }

    /**
     * Fetch all mood stations.
     *
     * @return {Promise}
     * @example api.moodStationFetcher.fetchAllMoodStations()
     * @see https://docs-en.kkbox.codes/v1.1/reference#moodstations
     */
    fetchAllMoodStations() {
        return this.http.get(ENDPOINT, {territory: this.territory})
    }

    /**
     * Init the mood station fetcher.
     *
     * @param {string} mood_station_id - The ID of a mood station.
     * @param {string} [territory = 'TW'] - ['TW', 'HK', 'SG', 'MY', 'JP'] The territory of a mood station.
     * @return {MoodStation}
     * @see https://docs-en.kkbox.codes/v1.1/reference#moodstations-station_id
     */
    setMoodStationID(mood_station_id, territory = 'TW') {
        this.mood_station_id = mood_station_id
        this.territory = territory
        return this
    }

    /**
     * Fetch the mood station's metadata.
     *
     * @return {Promise}
     * @example api.moodStationFetcher.setMoodStationID('StGZp2ToWq92diPHS7').fetchMetadata()
     * @see https://docs-en.kkbox.codes/v1.1/reference#moodstations-station_id
     */
    fetchMetadata() {
        return this.http.get(ENDPOINT + this.mood_station_id, {territory: this.territory})
    }
}