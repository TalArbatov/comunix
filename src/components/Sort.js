import React from 'react';

const Sort = ({
  onSort,
  type
}) => {
  const getSortTypes = (type) => {
    switch(type) {
      case 'artist':
        return ['Most popular', 'Least popular'];
      case 'album':
        return ['Most recent', 'Least recent', 'Most tracks', 'Least tracks'];
      case 'track':
        return ['Longest', 'Shortest'];
      case 'playlist':
        return ['Most tracks', 'Least tracks'];
      default: return [];
    }
  } 

  return (
    <div>
      <span>Sort by: </span>
      <select onChange={ onSort }>
        <option value="no_sort">---</option>
        { getSortTypes(type).map(sort => <option key={ sort } value={ sort }>{ sort }</option>) }
      </select>
    </div>
  );
};

export default Sort;