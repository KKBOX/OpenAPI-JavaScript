import {CHARTS as ENDPOINT} from '../Endpoint'
import Fetcher from './Fetcher'

/**
 * The fetcher that can fetch chart playlists.
 * @see https://docs-en.kkbox.codes/v1.1/reference#charts
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
     * @see https://docs-en.kkbox.codes/v1.1/reference#charts_1
     */
    fetchCharts() {
        return this.http.get(ENDPOINT, {
            territory: this.territory
        })
    }
}