import React from 'react';
import SuitDisplay from './SuitDisplay';
import SuitList from './SuitList';
import Header from './Header';

function App(){
  return (
    <div>
      <Header />
      <br/>
      <SuitList />
      <hr/>
      <SuitDisplay />
    </div>
  );
}

export default App;
