const API_DOMAIN = (() => {
    return process.env.NODE_ENV === 'staging' ? 'https://api.kkbox-staging.com/v1.1/' : 'https://api.kkbox.com/v1.1/'
})()
/**
 * @ignore
 */
export const SEARCH = API_DOMAIN + 'search/'

/**
 * @ignore
 */
export const TRACKS = API_DOMAIN + 'tracks/'

/**
 * @ignore
 */
export const ARTISTS = API_DOMAIN + 'artists/'

/**
 * @ignore
 */
export const ALBUMS = API_DOMAIN + 'albums/'

/**
 * @ignore
 */
export const SHARED_PLAYLISTS = API_DOMAIN + 'shared-playlists/'

/**
 * @ignore
 */
export const MOOD_STATIONS = API_DOMAIN + 'mood-stations/'

/**
 * @ignore
 */
export const FEATURED_PLAYLISTS = API_DOMAIN + 'featured-playlists/'

/**
 * @ignore
 */
export const FEATURED_PLAYLISTS_CATEGORIES = API_DOMAIN + 'featured-playlist-categories/'

/**
 * @ignore
 */
export const NEW_RELEASE_CATEGORIES = API_DOMAIN + 'new-release-categories/'

/**
 * @ignore
 */
export const NEW_HITS_PLAYLISTS = API_DOMAIN + 'new-hits-playlists/'

/**
 * @ignore
 */
export const GENRE_STATIONS = API_DOMAIN + 'genre-stations/'

/**
 * @ignore
 */
export const CHARTS = API_DOMAIN + 'charts/'

/**
 * @ignore
 */
export const SEARCH_TYPES = {
    ARTIST: 'artist',
    ALBUM: 'album',
    TRACK: 'track',
    PLAY_LIST: 'playlist'
}

const OAuth_DOMAIN = 'https://account.kkbox.com/oauth2/'

/**
 * @ignore
 */
export const Token = OAuth_DOMAIN + 'token/'

/**
 * @ignore
 */
export const Authorization = OAuth_DOMAIN + 'authorize/'