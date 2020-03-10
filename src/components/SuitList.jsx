import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restartSuit } from './../actions';
import { changeSuit } from './../actions';

const SuitList = ({ dispatch, suitList }) => {
  let action;
  return (
    <div>
      <em>Or select from our list:</em>
      {Object.keys(suitList).map(suitId => {
        let suit = suitList[suitId];
        return <li key = {suitId} onClick = {() => {
          if (suit.arrayPosition > 0){
          dispatch(restartSuit(suitId));
          }
          dispatch(changeSuit(suitId));
        }}>
          {suit.title} by {suit.artist}</li>;
      })}
    </div>
  );
};

SuitList.propTypes = {
  suitList: PropTypes.object,
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  return {
    suitList: state.suitsById
  };
};

export default connect(mapStateToProps)(SuitList);
