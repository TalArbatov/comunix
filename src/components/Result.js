import React from 'react';
import { StyledResult } from '../styles';

const PLAYLIST_MAX_CHARACTERS = 80;

const Result = ({
  type,
  item
}) => {
  const getDescription = () => {
    if (item.description.length > PLAYLIST_MAX_CHARACTERS)
      return item.description.substr(0, PLAYLIST_MAX_CHARACTERS) + '...';
    else return item.description;
  };

  const convertMs = millis => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  };

  const getArtistsFromItem = item => {
    const artists = item.artists.map(artist => artist.name);
    return artists.join(', ');
  };

  const renderResults = () => {
    switch(type) {
      case 'artist':
        return (
        <div className="result-wrapper">
          <div className="result-image">
            <a href={ item.external_urls.spotify }>
              <img src={ item?.images[0]?.url } />
            </a>
          </div>
          <div className="result-text">
            <p>Name: {item.name}</p>
            <p>Followers: {item.followers.total}</p>
            <p>Genres: { item.genres.join(', ') }</p>
          </div>
        </div>);
      case 'album':
        const artists = item.artists.map(artist => artist.name);
        return (
          <div className="result-wrapper">
            <div className="result-image">
              <a href={ item.external_urls.spotify }>
                <img src={ item?.images[0]?.url } />
              </a>
            </div>
            <div className="result-text">
              <p>Name: {item.name}</p>
              <p>Release date: { item.release_date }</p>
              <p>Made by: { artists.join(', ') }</p>
              <p>Total tracks: { item.total_tracks }</p>
            </div>
          </div>);
      case 'track':
      return (
        <div className="result-wrapper">
          <div className="result-image-small">
            <a href={ item.external_urls.spotify }>
              <img src={ item?.album.images[0]?.url } />
            </a>
          </div>
          <div className="result-text">
            <p>Name: { item.name }</p>
            <p>Duration: { convertMs(item.duration_ms) }</p>
            <p>Album: { item.album.name }</p>
            <p>Artists: { getArtistsFromItem(item) }</p>
          </div>
        </div>);
      case 'playlist':
        return (
          <div className="result-wrapper">
            <div className="result-image">
              <a href={ item.external_urls.spotify }>
                <img src={ item?.images[0]?.url } />
              </a>
            </div>
            <div className="result-text">
              <p>Name: {item.name}</p>
              <p>Description: { getDescription() }</p>
              <p>Num. of tracks: { item.tracks.total }</p>
            </div>
          </div>);
     
      default: 
        return null;
    }
  }
  return (
    <StyledResult>
      { renderResults() }
    </StyledResult>
  );
};

export default Result;