import React from 'react';

const Filter = ({
  onFilter,
  type
}) => {
  const getFilterType = type => {
    switch(type) {
      case 'artist':
        return 'Genre';
      case 'album':
      case 'track':
        return 'Artist'
      default:
        return '';
    }
  };
  
  const filterType = getFilterType(type);
  return filterType !== '' ? (
    <div>
      <input type="text" placeholder={ `Filter by ${filterType}` } onChange={ onFilter } />
    </div>
  ) : null;
};

export default Filter;