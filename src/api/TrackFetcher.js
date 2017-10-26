import {TRACKS as ENDPOINT} from '../Endpoint'
import Fetcher from './Fetcher'

/**
 * Get metadata of a track.
 * @see https://kkbox.gelato.io/docs/versions/1.1/resources/tracks
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
        this.track_id = undefined
    }

    /**
     * Set the track fetcher's track ID.
     *
     * @param {string} track_id - The ID of a track.
     * @return {Track}
     * @see https://kkbox.gelato.io/docs/versions/1.1/resources/tracks/endpoints/get-tracks-track_id
     */
    setTrackID(track_id) {
        this.track_id = track_id
        return this
    }

    /**
     * Get metadata of the track with the track fetcher.
     *
     * @return {Promise}
     * @example api.Track.setTrackID('KpnEGVHEsGgkoB0MBk').fetchMetadata()
     * @see https://kkbox.gelato.io/docs/versions/1.1/resources/tracks/endpoints/get-tracks-track_id
     */
    fetchMetadata() {
        return this.http.get(ENDPOINT + this.track_id, {territory: this.territory})
    }

    /**
     * Get KKBOX web widget uri of the track.
     * @example https://widget.kkbox.com/v1/?id=8sD5pE4dV0Zqmmler6&type=song
     * @return {string}
     */
    getWidgetUri(){
        return `https://widget.kkbox.com/v1/?id=${this.track_id}&type=song`
    }
}