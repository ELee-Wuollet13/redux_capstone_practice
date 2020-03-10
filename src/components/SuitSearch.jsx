import React from 'react';
import { fetchSuitId } from './../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function SuitSearch({ dispatch }){
  let input;
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
      dispatch(fetchSuitId(input.value.trim()));
        console.log('SEARCHED ARTIST:');
        console.log(input.value.trim());
        //...instead of these console.log()s....
        input.value = '';
      }}>
        <input placeholder="Suit Title" ref={node => {
          input = node;
        }}></input>
        <button>Search</button>
      </form>
    </div>
  );
}
SuitSearch.propTypes = {
  dispatch: PropTypes.func
};
export default connect()(SuitSearch);
