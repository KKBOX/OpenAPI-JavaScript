import should from 'should'
import {Auth} from '../dist/kkbox-server-sdk'
import {Api} from '../dist/kkbox-server-sdk'
import {kkbox_sdk} from './client_secrets.json'
const CLIENT_ID = kkbox_sdk.client_id
const CLIENT_SECRET = kkbox_sdk.client_secret

describe('SDK Begin to Test', () => {
    describe('Auth', () => {
        it('should get access token', () => {
            const auth = new Auth(CLIENT_ID, CLIENT_SECRET)
            return auth.clientCredentialsFlow.fetchAccessToken().then(response => {
                describe('Api With Fake Token', () => {
                    const api = new Api('FAKE_TOKEN', 'HK')
                    describe('Property checking', () => {
                        it('should have HK as territory', (done) => {                            
                            api.territory.should.be.exactly('HK')
                            done()                            
                        })
                    })

                    describe('Search with fake token', () => {
                        it('should fail', () => {
                            return api.searchFetcher.setSearchCriteria('flash').fetchSearchResult().then(response => {
                                should.not.exists(response)                                
                            }).catch(error => {
                                should.exists(error)                                
                            })
                        })
                    })
                })

                const access_token = response.data.access_token
                access_token.should.be.ok

                describe('Api', () => {
                    const api = new Api('FAKE_TOKEN', 'HK')
                    api.setToken(access_token)
                    describe('Search', () => {
                        it('should response status 200', () => {
                            return api.searchFetcher.setSearchCriteria('flash').fetchSearchResult().then(response => response.status.should.be.exactly(200))
                        })
                    })

                    describe('Track', () => {
                        it('should response status 200', () => {
                            return api.trackFetcher.setTrackID('KpnEGVHEsGgkoB0MBk').fetchMetadata().then(response => response.status.should.be.exactly(200))
                        })
                    })

                    describe('Album', () => {
                        it('should response status 200', () => {
                            return api.albumFetcher.setAlbumID('KmRKnW5qmUrTnGRuxF').fetchMetadata().then(response => response.status.should.be.exactly(200))
                        })
                    })

                    describe('Artist', () => {
                        it('should response status 200', () => {
                            return api.artistFetcher.setArtistID('Cnv_K6i5Ft4y41SxLy').fetchMetadata().then(response => response.status.should.be.exactly(200))
                        })
                    })

                    describe('Featured Playlists', () => {
                        it('should response status 200', () => {
                            return api.featuredPlaylistFetcher.fetchAllFeaturedPlaylists().then(response => response.status.should.be.exactly(200))
                        })
                    })

                    describe('Featured Playlist Category', () => {
                        it('should response status 200', () => {
                            return api.featuredPlaylistCategoryFetcher.fetchAllFeaturedPlaylistCategories().then(response => response.status.should.be.exactly(200))
                        })
                    })

                    describe('Mood Station', () => {
                        it('should response status 200', () => {
                            return api.moodStationFetcher.fetchAllMoodStations().then(response => response.status.should.be.exactly(200))
                        })
                    })

                    describe('Genre Station', () => {
                        it('should response status 200', () => {
                            return api.genreStationFetcher.fetchAllGenreStations().then(response => response.status.should.be.exactly(200))
                        })
                    })

                    describe('Chart', () => {
                        it('should response status 200', () => {
                            return api.chartFetcher.fetchCharts().then(response => response.status.should.be.exactly(200))
                        })
                    })

                    describe('New Release Category', () => {
                        it('should response status 200', () => {
                            return api.newReleaseCategoryFetcher.fetchAllNewReleaseCategories().then(response => response.status.should.be.exactly(200))
                        })
                    })

                    describe('New Hits Playlists', () => {
                        it('should response status 200', () => {
                            return api.newHitsPlaylistFetcher.fetchAllNewHitsPlaylists().then(response => response.status.should.be.exactly(200))
                        })
                    })

                    describe('Shared Playlist', () => {
                        it('should response status 200', () => {
                            return api.sharedPlaylistFetcher.setPlaylistID('KsOjSf4whgbL45hRfl').fetchMetadata().then(response => response.status.should.be.exactly(200))
                        })
                        it('should response status 200', () => {
                            return api.sharedPlaylistFetcher.setPlaylistID('KsOjSf4whgbL45hRfl').fetchTracks().then(response => response.status.should.be.exactly(200))
                        })
                    })
                })
            })
        })
    })
})