import React from 'react';
import { StyledResults } from '../styles';
import Filter from './Filter';
import Result from './Result';
import Sort from './Sort';

const Results = ({
  type = '',
  data = [],
  showMore,
  itemAmount = 0,
  onSort,
  onFilter
}) => {

  const getTitle = type => {
    switch(type) {
      case 'artist':
        return 'Artists';
      case 'album':
        return 'Albums';
      case 'track':
        return 'Tracks';
      case 'playlist':
        return 'Playlists';
      default:
        return '';
    };
  }

  return (
    <StyledResults>
      <h2>{ getTitle(type) }</h2>
      <div className="options-wrapper">
        <Sort type={ type } onSort={ onSort } />
        <Filter type={ type } onFilter={ onFilter } />
      </div>
      { 
        data.map(item => (
          <Result key={ item.id } item={ item } type={ type }/>
        ))
      }
      <div className="show-more-container">
        {
          itemAmount > 0 && <p onClick={ () => showMore(type) }>Show more ({ itemAmount })</p>
        }
      </div>
    </StyledResults>
  );
};

export default Results;
