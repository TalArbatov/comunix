import React, { useState } from 'react';
import { StyledContent } from '../styles';
import Search from './Search';
import Results from './Results';
import { searchEndpoint, getHeaders, dateToMilliseconds } from '../utils'
import axios from 'axios';
import _ from 'lodash';

const selectedTypes = ['artist', 'album', 'track', 'playlist'];
const Content = () => {
  const [search, setSearch] = useState('');
  
  // a seprate set of results is saved aside in case we need
  // to reset the state of sorting/filter without creating
  // a redundant API request. ogResults simulates a database/in-memory cache
  // which we can retrieve data from. in a real world solution, we'd 
  // want to find a better solution such as caching/API pagination to avoid
  // storing large data on the client-side state.

  const [ogResults, setOgResults] = useState({});
  const [results, setResults] = useState({});
  const [itemAmount, setItemAmount] = useState({
    artist: 5,
    album: 5,
    track: 5,
    playlist: 5
  });

  const handleSearch = () => {
    const tokenType = localStorage.getItem('tokenType');
    const accessToken = localStorage.getItem('accessToken');
    let resultsToSet = {};
    selectedTypes.forEach(type => {
      axios.get(searchEndpoint(search, type), {
        headers: getHeaders(tokenType, accessToken)
      }).then(res => {
        resultsToSet = { ...resultsToSet, [type + 's']: res.data[type + 's'].items };
      }).finally(() => {
        setOgResults(resultsToSet);
        setResults(resultsToSet);
      })  
    })
  };

  const showMore = type => {
    setItemAmount({
      ...itemAmount,
      [type]: itemAmount[type] + 5
    });
  };

  const onSort = (type, value) => {
    switch(type) {   
      case 'artist':
        const artists = [...results.artists];
        if (value === 'Most popular') {
          artists.sort((first, second) => {
            if (first.followers.total < second.followers.total) return 1;
            else if (first.followers.total > second.followers.total) return -1
            else return 0;
          });
          setResults({ ...results, artists });
        } else if (value === 'Least popular') {
          artists.sort((first, second) => {
            if (first.followers.total > second.followers.total) return 1;
            else if (first.followers.total < second.followers.total) return -1
            else return 0;
          });
          setResults({ ...results, artists });
        }
        break;
      case 'album':
        const albums = [...results.albums];
        if (value === 'Most recent') {
          albums.sort((first, second) => {
            if (dateToMilliseconds(first.release_date) < dateToMilliseconds(second.release_date)) return 1;
            else if (dateToMilliseconds(first.release_date) > dateToMilliseconds(second.release_date)) return -1
            else return 0;
          });
          setResults({ ...results, albums });
        } else if (value === 'Least recent') {
          albums.sort((first, second) => {
            if (dateToMilliseconds(first.release_date) > dateToMilliseconds(second.release_date)) return 1;
            else if (dateToMilliseconds(first.release_date) < dateToMilliseconds(second.release_date)) return -1
            else return 0;
          });
          setResults({ ...results, albums });
        } else if (value === 'Most tracks') {
          albums.sort((first, second) => {
            if (first.total_tracks < second.total_tracks) return 1;
            else if (first.total_tracks > second.total_tracks) return -1
            else return 0;
          });
          setResults({ ...results, albums });
        } else if (value === 'Least tracks') {
          albums.sort((first, second) => {
            if (first.total_tracks > second.total_tracks) return 1;
            else if (first.total_tracks < second.total_tracks) return -1
            else return 0;
          });
          setResults({ ...results, albums });
        }
        break;
      case 'track':
        const tracks = [...results.tracks];
        if (value === 'Longest') {
          tracks.sort((first, second) => {
            if (first.duration_ms < second.duration_ms) return 1;
            else if (first.duration_ms > second.duration_ms) return -1
            else return 0;
          });
          setResults({ ...results, tracks });
        } else if (value === 'Shortest') {
          tracks.sort((first, second) => {
            if (first.duration_ms > second.duration_ms) return 1;
            else if (first.duration_ms < second.duration_ms) return -1
            else return 0;
          });
          setResults({ ...results, tracks });
        }
        break;
      case 'playlist':
        const playlists = [...results.playlists];
        if (value === 'Most tracks') {
          playlists.sort((first, second) => {
            if (first.tracks.total < second.tracks.total) return 1;
            else if (first.tracks.total > second.tracks.total) return -1
            else return 0;
          });
          setResults({ ...results, playlists });
        } else if (value === 'Least tracks') {
          playlists.sort((first, second) => {
            if (first.tracks.total > second.tracks.total) return 1;
            else if (first.tracks.total < second.tracks.total) return -1
            else return 0;
          });
          setResults({ ...results, playlists });
        }
        break;
      default: return;
    }
  };

  const onFilter = _.debounce((type, keyword) => {
    if (keyword === '') {
      setResults({ ...results, [type + 's']: ogResults[type + 's'] })
      return;
    }
    switch(type) {
      case 'artist':
        const artists = results.artists.filter(artist => {
          let includes = false;
          artist.genres.forEach(genre => {
            if (genre.includes(keyword)) includes = true;
          });
          return includes;
        });
        setResults({ ...results, artists })
        break;
      case 'album':
        const albums = results.albums.filter(album => {
          let includes = false;
          album.artists.forEach(artist => {
            if (artist.name.includes(keyword)) includes = true;
          });
          return includes;
        });
        setResults({ ...results, albums })
        break;
      case 'track':
        const tracks = results.tracks.filter(track => {
          let includes = false;
          track.artists.forEach(artist => {
            if (artist.name.includes(keyword)) includes = true;
          });
          return includes;
        });
        setResults({ ...results, tracks })
        break;
      default: return;
    }
  }, 200)

  const renderResults = () => {
    return Object.keys(results).length !== 0 ? selectedTypes.map(type => {
      const data = results[type + 's']?.slice(0, itemAmount[type])
      const moreData = results[type + 's']?.length - data?.length;
      return <Results 
        key={ type }
        type={ type }
        onSort={ e => onSort(type, e.target.value) } 
        onFilter={ e => onFilter(type, e.target.value) }
        data={ data } 
        showMore={ showMore } 
        itemAmount={ moreData } />
    }) : null;
  }
  return (
    <StyledContent>
      <Search onSubmit={ handleSearch } onChange={ e => setSearch(e.target.value) }/>
      { renderResults() }
    </StyledContent>
  );
};

export default Content;