import should from 'should'
import HttpClient from '../src/api/HttpClient'
import SearchFetcher from '../src/api/SearchFetcher'
import AlbumFetcher from '../src/api/AlbumFetcher'
import ArtistFetcher from '../src/api/ArtistFetcher'
import FeaturedPlaylistFetcher from '../src/api/FeaturedPlaylistFetcher'
import FeaturedPlaylistCategoryFetcher from '../src/api/FeaturedPlaylistCategoryFetcher'
import NewReleaseCategoryFetcher from '../src/api/NewReleaseCategoryFetcher'
import NewHitsPlaylistFetcher from '../src/api/NewHitsPlaylistFetcher'
import SharedPlaylistFetcher from '../src/api/SharedPlaylistFetcher'
import MoodStationFetcher from '../src/api/MoodStationFetcher'
import GenreStationFetcher from '../src/api/GenreStationFetcher'
import ChartFetcher from '../src/api/ChartFetcher'
import TrackFetcher from '../src/api/TrackFetcher'
import TokenFetcher from '../src/auth/TokenFetcher'
import ClientCredentials from '../src/auth/ClientCredentialsFlow'
import {kkbox_sdk} from './client_secrets.json'
const CLIENT_ID = kkbox_sdk.client_id
const CLIENT_SECRET = kkbox_sdk.client_secret

describe('Api Begin to Test', () => {
    describe('ClientCredentials', () => {
        describe('#fetch the access token()', () => {
            it('should fetch access token', () => {
                const tokenFetcher = new TokenFetcher(CLIENT_ID, CLIENT_SECRET)
                const clientCredentials = new ClientCredentials(tokenFetcher)
                return clientCredentials.fetchAccessToken().then(response => {
                    const access_token = response.data.access_token
                    access_token.should.be.ok

                    const httpClient = new HttpClient(access_token)

                    describe('Search', () => {
                        const searchFetcher = new SearchFetcher(httpClient).setSearchCriteria('Linkin Park')
                        describe('#fetchSearchResult()', () => {
                            it('should response status 200', () => {
                                return searchFetcher.fetchSearchResult().then(response => {                                    
                                    response.status.should.be.exactly(200), reject => should.not.exists(reject)
                                })
                            })
                        })
                        
                        describe('#filter()', () => {
                            it('should get result', () => {
                                return searchFetcher.filter({                                    
                                    artist: 'Linkin Park',
                                    album: 'One More Light',
                                    available_territory: 'TW'
                                }).fetchSearchResult().then(response => {
                                    response.data.tracks.data.length.should.be.greaterThan(0)
                                })
                            })
                        })
                    })
                    
                    describe('Track', () => {
                        const track_id = 'KpnEGVHEsGgkoB0MBk'
                        const trackFetcher = new TrackFetcher(httpClient).setTrackID(track_id)
                        it('should response status 200', () => {
                            return trackFetcher.fetchMetadata().then(response => response.status.should.be.exactly(200), reject => should.not.exists(reject))
                        })

                        describe('#getWidgetUri', () => {
                            it('should return right uri', function (doneCb) {
                                trackFetcher.getWidgetUri().should.be.exactly(`https://widget.kkbox.com/v1/?id=${track_id}&type=song`)
                                doneCb()
                            })
                        })
                    })

                    describe('Album', () => {
                        const album_id = 'KmRKnW5qmUrTnGRuxF'
                        const albumFetcher = new AlbumFetcher(httpClient).setAlbumID(album_id)
                        describe('#fetchMetadata()', () => {
                            it('should response status 200', (done) => {
                                return albumFetcher.fetchMetadata().then(response => {
                                    response.status.should.be.exactly(200)
                                }, reject => {
                                    should.not.exist(reject)
                                })
                            })
                        })

                        describe('#fetchTracks()', () => {
                            var fulfillment = undefined                            
                            it('should response status 200', () => {
                                return albumFetcher.fetchTracks().then(response => {
                                    response.status.should.be.exactly(200)
                                    fulfillment = response 
                                }, reject => {
                                    should.not.exist(reject)
                                })
                            })

                            it('fetch next page should fail', () => {
                                return albumFetcher.fetchNextPage(fulfillment).then(response => {                                    
                                    throw new Error('Should not get response')
                                }, reject => {
                                    should.exist(reject)
                                })
                            })

                            it('should not have next page', (done) => {
                                albumFetcher.hasNextPage(fulfillment).should.be.false
                                done()
                            })
                        })                     

                        describe('#getWidgetUri', () => {
                            it('should return right uri', (done) => {
                                albumFetcher.getWidgetUri().should.be.exactly(`https://widget.kkbox.com/v1/?id=${album_id}&type=album`)
                                done()
                            })
                        })
                    })

                    describe('Album fetch next tracks', () => {
                        const album_id = 'Ks8MAYNedkIB_sGajW'   // Cosmic Explorer from Perfume
                        const albumFetcher = new AlbumFetcher(httpClient).setAlbumID(album_id)

                        describe('#fetchTracks(1)', () => {
                            it('should succeed and should fetch next page succeed', (done) => {
                                albumFetcher.fetchTracks(1).then(response => {
                                    response.status.should.be.exactly(200)                                    
                                    albumFetcher.fetchNextPage(response).then(response => {                                        
                                        response.data.data.should.be.an.instanceOf(Array)
                                        response.data.data.length.should.be.equal(1)
                                        response.status.should.be.exactly(200)
                                        done()
                                    }, reject => {
                                        done(reject)
                                    })
                                }, reject => {
                                    done(reject)
                                })
                            })
                        })                        
                    })

                    describe('Album fetch next page', () => {
                        const album_id = 'Ks8MAYNedkIB_sGajW'   // Cosmic Explorer from Perfume
                        const albumFetcher = new AlbumFetcher(httpClient).setAlbumID(album_id)

                        it('fetch next page should response status 200', () => {
                            return albumFetcher.fetchTracks(1).then(response => {
                                response.status.should.be.exactly(200)
                                albumFetcher.fetchNextPage(response).then(response => {                                        
                                    response.status.should.be.exactly(200)
                                }, reject => {                                        
                                    should.not.exists(reject)
                                })
                            }, reject => {
                                should.not.exists(reject)
                            })
                        })                      
                    })

                    describe('Shared Playlists', () => {
                        const playlist_id = '4nUZM-TY2aVxZ2xaA-'
                        const sharedPlaylistFetcher = new SharedPlaylistFetcher(httpClient).setPlaylistID(playlist_id)
                        describe('#find and get()', () => {
                            it('should response status 200', (done) => {
                                sharedPlaylistFetcher.fetchMetadata().then((response) => {
                                    response.status.should.be.exactly(200)
                                    done()
                                }).catch(error => {
                                    should.not.exists(error)
                                    done(error)
                                })
                            })
                        })

                        describe('#tracks()', () => {
                            it('should response status 200', (done) => {
                                sharedPlaylistFetcher.fetchTracks().then(response => {
                                    response.status.should.be.exactly(200)
                                    done()
                                }, reject => {
                                    done(reject)
                                })
                            })
                        })

                        describe('#getWidgetUri', () => {
                            it('should return right uri', (done) => {
                                sharedPlaylistFetcher.getWidgetUri().should.be.exactly(`https://widget.kkbox.com/v1/?id=${playlist_id}&type=playlist`)
                                done()
                            })
                        })
                    })

                    describe('Artist', () => {
                        const artistFetcher = new ArtistFetcher(httpClient).setArtistID('Cnv_K6i5Ft4y41SxLy')
                        describe('#fetchMetadata()', () => {
                            it('should response status 200', () => {
                                return artistFetcher.fetchMetadata().then(response => {
                                    response.status.should.be.exactly(200)
                                    return response
                                }).catch((error) => should.not.exists(error))
                            })
                        })

                        describe('#fetchAlbums()', () => {
                            it('should succeed and fetch next page should fail', () => {
                                return artistFetcher.fetchAlbums().then(response => {
                                    response.status.should.be.exactly(200)
                                    artistFetcher.fetchNextPage(response).then(response => {
                                        response.status.should.not.be.exactly(200)
                                        return response
                                    }).catch((error) => should.exists(error))
                                    return response
                                }).catch((error) => should.not.exists(error))
                            })
                        })                      

                        describe('#fetchTopTracks()', () => {
                            it('should response status 200', (done) => {
                                artistFetcher.fetchTopTracks().then(response => response.status.should.be.exactly(200), reject => should.not.exists(reject))
                            })
                        })

                        describe('#fetchRelatedArtists()', () => {
                            it('should response status 200', (done) => {
                                artistFetcher.fetchRelatedArtists().then(response => response.status.should.be.exactly(200), reject => should.not.exists(reject))
                            })
                        })
                    })

                    describe('Artist fetch album tests', () => {
                        const artistFetcher = new ArtistFetcher(httpClient).setArtistID('Cnv_K6i5Ft4y41SxLy')
                        describe('#fetchAlbums(1)', () => {
                            it('should succeed and fetch next page shuold succeed', (done) => {
                                artistFetcher.fetchAlbums(1).then(response => {                                    
                                    response.status.should.be.exactly(200)
                                    artistFetcher.fetchNextPage(response).then(response => {
                                        response.status.should.be.exactly(200)
                                        done()
                                    }, reject => {
                                        done(reject)
                                    })
                                })
                            })
                        })

                        describe('#fetchTopTracks(1)', () => {
                            it('should succeed and fetch next page shuold succeed', (done) => {
                                artistFetcher.fetchTopTracks(1).then(response => {                                    
                                    response.status.should.be.exactly(200)
                                    artistFetcher.fetchNextPage(response).then(response => {
                                        response.status.should.be.exactly(200)
                                        done()
                                    }, reject => {
                                        done(reject)
                                    })
                                })
                            })
                        })                        
                    })

                    describe('Featured Playlists', () => {
                        const featuredPlaylistFetcher = new FeaturedPlaylistFetcher(httpClient)
                        describe('#fetchAllFeaturedPlaylists()', () => {
                            it('should response status 200', (done) => {
                                featuredPlaylistFetcher.fetchAllFeaturedPlaylists(1).then(response => {
                                    response.status.should.be.exactly(200)
                                    featuredPlaylistFetcher.fetchNextPage(response).then(response => {
                                        response.status.should.be.exactly(200)
                                        done()
                                    }, reject => {
                                        done(reject)
                                    })
                                })
                            })
                        })
                    })

                    describe('Featured Playlist Category', () => {
                        const featuredPlaylistCategoryFetcher = new FeaturedPlaylistCategoryFetcher(httpClient)
                        describe('#fetchAll()', () => {
                            it('should response status 200', () => {
                                return featuredPlaylistCategoryFetcher.fetchAllFeaturedPlaylistCategories().then(response => response.status.should.be.exactly(200), reject => should.not.exists(reject))
                            })
                        })

                        const f = featuredPlaylistCategoryFetcher.setCategoryID('LXUR688EBKRRZydAWb')
                        describe('#fetchMetadata()', () => {
                            it('should response status 200', () => {
                                return f.fetchMetadata().then(response => response.status.should.be.exactly(200), reject => should.not.exists(reject))
                            })
                        })

                        describe('#fetchPlaylists()', () => {
                            it('should response status 200 and fetch next page should succeed', (done) => {
                                f.fetchPlaylists().then(response => {
                                    response.status.should.be.exactly(200)
                                    f.fetchNextPage(response).then(response => {
                                        response.status.should.be.exactly(200)
                                        done()                                        
                                    }, reject => {
                                        done(reject)
                                    })
                                })
                            })
                        })
                    })

                    describe('Mood Station', () => {
                        const moodStationFetcher = new MoodStationFetcher(httpClient)
                        describe('#fetchAll()', () => {
                            it('should succeed', () => {
                                return moodStationFetcher.fetchAllMoodStations().then(response => response.status.should.be.exactly(200), reject => should.not.exists(reject))
                            })
                        })

                        describe('#fetchMetadata()', () => {
                            it('should succeed', () => {
                                return moodStationFetcher.setMoodStationID('StGZp2ToWq92diPHS7').fetchMetadata().then(response => response.status.should.be.exactly(200), reject => should.not.exists(reject))
                            })
                        })
                    })

                    describe('Genre Station', () => {
                        const genreStationFetcher = new GenreStationFetcher(httpClient)
                        describe('#fetchAllGenreStations()', () => {
                            it('should succeed and fetch next page should succeed', (done) => {
                                genreStationFetcher.fetchAllGenreStations(1).then(response => {
                                    response.status.should.be.exactly(200)
                                    genreStationFetcher.fetchNextPage(response).then(response => {
                                        response.status.should.be.exactly(200)
                                        done()
                                    }, reject => {
                                        done(reject)
                                    })
                                })
                            })
                        })

                        describe('#fetchMetadata()', () => {
                            it('should succeed', () => {
                                return genreStationFetcher.setGenreStationID('TYq3EHFTl-1EOvJM5Y').fetchMetadata().then(response => response.status.should.be.exactly(200), reject => should.not.exists(reject))
                            })
                        })
                    })

                    describe('Chart', () => {
                        const chartFetcher = new ChartFetcher(httpClient)
                        describe('#fetchCharts()', () => {
                            it('should succeed and fetch next page should fail', (done) => {
                                chartFetcher.fetchCharts().then(response => {                                    
                                    response.status.should.be.exactly(200)
                                    chartFetcher.hasNextPage(response).should.be.false()
                                    chartFetcher.fetchNextPage(response).then(response => {
                                        response.should.not.exists()
                                        done(response)
                                    }, reject => {
                                        done()
                                    })
                                })
                            })
                        })

                        describe('#fetchMetadata()', () => {
                            it('should succeed', (done) => {
                                chartFetcher.setPlaylistID('4mJSYXvueA8t0odsny').fetchMetadata()
                                    .then(response => response.status.should.be.exactly(200), reject => should.not.exists(reject))
                            })
                        })

                        describe('#fetchTracks()', () => {
                            it('should succeed', (done) => {
                                chartFetcher.setPlaylistID('4mJSYXvueA8t0odsny').fetchTracks()
                                    .then(response => response.status.should.be.exactly(200), reject => should.not.exists(reject))
                            })
                        })
                    })
                    
                    describe('New Release Category', () => {
                        const newReleaseCategoryFetcher = new NewReleaseCategoryFetcher(httpClient)
                        describe('#fetchAll()', () => {
                            it('should succeed and fetch next page should succeed', (done) => {
                                newReleaseCategoryFetcher.fetchAllNewReleaseCategories(1).then(
                                    response => {
                                        response.status.should.be.exactly(200)
                                        newReleaseCategoryFetcher.hasNextPage(response).should.be.true()
                                        newReleaseCategoryFetcher.fetchNextPage(response).then(response => {
                                            response.status.should.be.ok()
                                            done()
                                        }, reject => {
                                            done(reject)
                                        })
                                    }, reject => should.not.exists(reject)
                                )
                            })
                        })                        

                        const f = newReleaseCategoryFetcher.setCategoryID('Cng5IUIQhxb8w1cbsz')
                        describe('#fetchMetadata()', () => {
                            it('should response status 200', () => {
                                return f.fetchMetadata().then(response => response.status.should.be.exactly(200), reject => should.not.exists(reject))
                            })
                        })

                        describe('#fetchAlbums()', () => {
                            it('should response status 200 and fetch next page should succeed', (done) => {
                                f.fetchAlbums().then(response => {
                                    response.status.should.be.exactly(200)
                                    f.fetchNextPage(response).then(response => {
                                        response.status.should.be.exactly(200)
                                        done()                                        
                                    }, reject => {
                                        done(reject)
                                    })
                                })
                            })
                        })
                    })
                    
                    describe('New Hits Playlists', () => {
                        const newHitsPlaylistFetcher = new NewHitsPlaylistFetcher(httpClient)
                        describe('#fetchAll()', () => {
                            it('should succeed', () => {
                                newHitsPlaylistFetcher.fetchAllNewHitsPlaylists().then(
                                    response => {
                                        response.status.should.be.exactly(200)
                                    }
                                ).catch(error => should.not.exists(error))
                            })
                        })                        
                        
                        const f = newHitsPlaylistFetcher.setPlaylistID('DZni8m29ciOFbRxTJq')
                        describe('#fetchMetadata()', () => {
                            it('should succeed', () => {
                                return f.fetchMetadata().then(response => response.status.should.be.exactly(200), reject => should.not.exists(reject)).catch(error => should.not.exsits(error))
                            })
                        })

                        describe('#fetchTracks()', () => {
                            it('should succeed', () => {
                                return f.fetchTracks().then(response => response.status.should.be.exactly(200), reject => should.not.exists(reject)).catch(error => should.not.exsits(error))
                            })
                        })
                    })
                }, reject => should.not.exists(reject))
            })
        })
    })
})