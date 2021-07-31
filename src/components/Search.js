import React from 'react';
import { StyledSearch } from '../styles';

const Search = ({
  onChange,
  onSubmit
}) => {
  return (
    <StyledSearch>
      <input type="text" placeholder="Search artist..." onChange={ onChange }/>
      <button onClick={ onSubmit }>Search</button>
    </StyledSearch>
  );
};

export default Search;