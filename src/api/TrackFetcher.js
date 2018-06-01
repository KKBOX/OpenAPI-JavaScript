import { TRACKS as ENDPOINT } from '../Endpoint'
import Fetcher from './Fetcher'

/**
 * Get metadata of a track.
 * @see https://docs-en.kkbox.codes/v1.1/reference#tracks
 */
export default class TrackFetcher extends Fetcher {
    /**
     * @ignore
     */
    constructor(http, territory = 'TW') {
        super(http, territory)

        /**
         * @ignore
         */
        this.trackID = undefined
    }

    /**
     * Set the track fetcher's track ID.
     *
     * @param {string} trackID - The ID of a track.
     * @return {Track}
     * @see https://docs-en.kkbox.codes/v1.1/reference#tracks-track_id
     */
    setTrackID(trackID) {
        this.trackID = trackID
        return this
    }

    /**
     * Get metadata of the track with the track fetcher.
     *
     * @return {Promise}
     * @example api.trackFetcher.setTrackID('KpnEGVHEsGgkoB0MBk').fetchMetadata()
     * @see https://docs-en.kkbox.codes/v1.1/reference#tracks-track_id
     */
    fetchMetadata() {
        return this.http.get(ENDPOINT + '/' + this.trackID, {
            territory: this.territory
        })
    }

    /**
     * Get KKBOX web widget uri of the track.
     * @example https://widget.kkbox.com/v1/?id=8sD5pE4dV0Zqmmler6&type=song
     * @return {string}
     */
    getWidgetUri() {
        return `https://widget.kkbox.com/v1/?id=${this.trackID}&type=song`
    }
}
