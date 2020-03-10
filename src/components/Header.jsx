import React from 'react';
import SuitSearch from './SuitSearch';

function Header(){
  return (
    <div>
      <h1>Singer</h1>
      <em>Search for a suit:</em>
      <SuitSearch />
    </div>
  );
}

export default Header;
