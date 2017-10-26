import {CHARTS as ENDPOINT} from '../Endpoint'
import Fetcher from './Fetcher'

/**
 * The fetcher that can fetch chart playlists.
 * @see https://kkbox.gelato.io/docs/versions/1.1/resources/charts
 */
export default class ChartFetcher extends Fetcher {
    /**
     * @ignore
     */
    constructor(http, territory = 'TW') {
        super(http, territory = 'TW')
    }

    /**
     * Fetch chart playlists.
     *
     * @return {Promise}
     * @example api.chartFetcher.fetchCharts()
     * @see https://kkbox.gelato.io/docs/versions/1.1/resources/charts/endpoints/get-charts
     */
    fetchCharts() {
        return this.http.get(ENDPOINT, {
            territory: this.territory
        })
    }
}