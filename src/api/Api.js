import HttpClient from './HttpClient'
import SearchFetcher from './SearchFetcher'
import TrackFetcher from './TrackFetcher'
import AlbumFetcher from './AlbumFetcher'
import ArtistFetcher from './ArtistFetcher'
import FeaturedPlaylistFetcher from './FeaturedPlaylistFetcher'
import FeaturedPlaylistCategoryFetcher from './FeaturedPlaylistCategoryFetcher'
import NewReleaseCategoryFetcher from './NewReleaseCategoryFetcher'
import NewHitsPlaylistFetcher from './NewHitsPlaylistFetcher'
import GenreStationFetcher from './GenreStationFetcher'
import MoodStationFetcher from './MoodStationFetcher'
import ChartFetcher from './ChartFetcher'
import SharedPlaylistFetcher from './SharedPlaylistFetcher'

/**
 * Fetch KKBOX resources.
 */
export default class Api {
    /**
     * Need access token to initialize.
     *
     * @param {string} token - Get via Auth.
     * @param {string} [territory = 'TW'] - ['TW', 'HK', 'SG', 'MY', 'JP'] The territory for the fetcher.
     * @example new Api(token)
     * @example new Api(token, 'TW')
     */
    constructor(token, territory = 'TW') {        
        this.territory = territory
        this.httpClient = undefined
        this.setToken(token)
    }

    /**
     * Set new token and create fetchers with the new token.
     *
     * @param {string} token - Get via Auth.
     * @example api.setToken(token)
     */
    setToken(token) {
        this.httpClient = new HttpClient(token)

        /**
         * @type {SearchFetcher}
         */
        this.searchFetcher = new SearchFetcher(this.httpClient, this.territory)

        /**
         * @type {TrackFetcher}
         */
        this.trackFetcher = new TrackFetcher(this.httpClient, this.territory)

        /**
         * @type {AlbumFetcher}
         */
        this.albumFetcher = new AlbumFetcher(this.httpClient, this.territory)

        /**
         * @type {ArtistFetcher}
         */
        this.artistFetcher = new ArtistFetcher(this.httpClient, this.territory)

        /**
         * @type {FeaturedPlaylistFetcher}
         */
        this.featuredPlaylistFetcher = new FeaturedPlaylistFetcher(this.httpClient, this.territory)

        /**
         * @type {FeaturedPlaylistCategoryFetcher}
         */
        this.featuredPlaylistCategoryFetcher = new FeaturedPlaylistCategoryFetcher(this.httpClient, this.territory)

        /**
         * @type {NewReleaseCategoryFetcher}
         */        
        this.newReleaseCategoryFetcher = new NewReleaseCategoryFetcher(this.httpClient, this.territory)

        /**
         * @type {NewHitsPlaylistFetcher}
         */        
        this.newHitsPlaylistFetcher = new NewHitsPlaylistFetcher(this.httpClient, this.territory)
        
        /**
         * @type {GenreStationFetcher}
         */
        this.genreStationFetcher = new GenreStationFetcher(this.httpClient, this.territory)

        /**
         * @type {MoodStationFetcher}
         */
        this.moodStationFetcher = new MoodStationFetcher(this.httpClient, this.territory)

        /**
         * @type {ChartFetcher}
         */
        this.chartFetcher = new ChartFetcher(this.httpClient, this.territory)
        
        /**
         * @type {SharedPlaylistFetcher}
         */
        this.sharedPlaylistFetcher = new SharedPlaylistFetcher(this.httpClient, this.territory)
    }
}