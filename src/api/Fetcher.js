/**
 * Base api fetcher.
 */
export default class Fetcher {
    /**
     * @param {Http} http
     * @param {string} [territory = 'TW'] - ['TW', 'HK', 'SG', 'MY', 'JP'] The territory for the fetcher.
     */
    constructor(http, territory = 'TW') {
        /**
         * @ignore
         */
        this.http = http

        /**
         * @ignore
         */
        this.territory = territory
    }

    /**
     * Set the fetcher's territory.
     * @param {string} [territory = 'TW'] - ['TW', 'HK', 'SG', 'MY', 'JP'] The territory for the fetcher.
     * @return {Fetcher}
     */
    setTerritory(territory) {
        this.territory = territory
        return this
    }

    /**
     * Gets an object's nested property by path.
     * @ignore
     */
    getPropertyByPath(object, path) {
        path = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
        path = path.replace(/^\./, '') // strip a leading dot
        var keys = path.split('.')
        for (var i = 0, n = keys.length; i < n; ++i) {
            var key = keys[i]
            if (key in object) {
                object = object[key]
            } else {
                return
            }
        }
        return object
    }

    /**
     * Fetches next page of various paged APIs.
     *
     * @param {fulfillment} fulfillment - The fulfillment get from Promose's onFulfillment function
     * @param {String} nextUriPath - The next uri's path. Defaults to 'data.paging.next',
     * which means we will get the next uri path from 'fulfillment.data.paging.next'.
     * The correct next uri path depends on respective api's response.
     * @return {Promise}
     * @example
     * api.albumFetcher.setAlbumID('KmRKnW5qmUrTnGRuxF').fetchTracks().then(response => {
     *      api.albumFetcher.fetchNextPage(response))
     * })
     */
    fetchNextPage(fulfillment, nextUriPath = 'data.paging.next') {
        var nextUri = this.getPropertyByPath(fulfillment, nextUriPath)
        if (nextUri != null && nextUri !== undefined) {
            return this.http.get(nextUri)
        } else {
            return new Promise((resolve, reject) => {
                reject(new Error('Cannot fetch next page'))
            })
        }
    }

    /**
     * Is next page available for various paged APIs.
     * @param {fulfillment} fulfillment - The fulfillment get from Promose's onFulfillment function
     * @param {String} nextUriPath - The next uri's path. Defaults to 'data.paging.next',
     * which means we will get the next uri path from 'fulfillment.data.paging.next'.
     * The correct next uri path depends on respective api's response.
     * @return {Boolean}
     * @example
     * api.albumFetcher.setAlbumID('KmRKnW5qmUrTnGRuxF').fetchTracks().then(response => {
     *      if (api.albumFetcher.hasNextPage(response)) {
     *          // more data available
     *      }
     * })
     */
    hasNextPage(fulfillment, nextUriPath = 'data.paging.next') {
        var nextUri = this.getPropertyByPath(fulfillment, nextUriPath)
        return (nextUri != null && nextUri !== undefined)
    }
}
